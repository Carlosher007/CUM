from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.db.models import Count, Max

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from ..models import Quotation, AssignedQuote
from .serializers import (QuotationSerializer, CreateAssignedQuoteSerializer,
                          ListAssignedQuoteSerializer)

from apps.usuario.models import User

class QuotationApiView(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    queryset = Quotation.objects.all()

    def create(self, request, *args, **kwargs):
        quotation_serializer = QuotationSerializer(data=request.data)
        if quotation_serializer.is_valid():
            best_seller = AssignedQuote.objects.values('seller').annotate(
                count=Count('quotation')
            ).order_by('count').filter(
                seller__sucursal=quotation_serializer.validated_data['client'].sucursal
                )
            
            quotation = Quotation(
                    vehicle_sucursal=quotation_serializer.validated_data['vehicle_sucursal'],
                    client=quotation_serializer.validated_data['client'],
                    num_installments=quotation_serializer.validated_data['num_installments'],
                    initial_fee=quotation_serializer.validated_data['initial_fee'],
                    quota_value=quotation_serializer.validated_data['quota_value']
                )

            if best_seller.exists():
                best_seller = best_seller.first()
                best_seller = User.objects.get(pk=best_seller['seller'])
            else:
                best_seller = User.objects.filter(
                    rol='Vendedor',
                    sucursal=quotation_serializer.validated_data['client'].sucursal
                )
                if best_seller.exists():
                    best_seller = best_seller.first()
                else:
                    return Response({'error':'La sucursal no tiene vendedores disponibles'},
                                status=status.HTTP_405_METHOD_NOT_ALLOWED)

            quotation.save()
            assigned_quote = AssignedQuote(
                quotation=quotation, 
                seller=best_seller)
            assigned_quote.save()
            return Response(ListAssignedQuoteSerializer(assigned_quote).data,
                        status=status.HTTP_201_CREATED)
            
        return Response(quotation_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

class AssignedQuoteApiView(viewsets.ModelViewSet):
    serializer_class = CreateAssignedQuoteSerializer
    queryset = AssignedQuote.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return ListAssignedQuoteSerializer
        return CreateAssignedQuoteSerializer

    @action(detail=False, methods=['GET'], url_path='assigned-quotes-seller/(?P<seller>\w+)/(?P<state>\w+)')
    def get_assigned_quotes_seller(self, request, seller:str, state:str):
        states = ["IN_PROGRESS","CANCELLED", "ACCEPTED",
        "FINISHED", "ALL"]
        if state in states:
            if state == "ALL":
                assigned_quotes = AssignedQuote.objects.filter(seller=seller)
            else:
                assigned_quotes = AssignedQuote.objects.filter(seller=seller, state=state)
            assigned_quote_serializer = ListAssignedQuoteSerializer(assigned_quotes, many=True)
            return Response(assigned_quote_serializer.data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='assigned-quotes-client/(?P<client>\w+)/(?P<state>\w+)')
    def get_assigned_quotes_client(self, request, client:str, state:str):
        states = ["IN_PROGRESS","CANCELLED", "ACCEPTED",
        "FINISHED", "ALL"]
        if state in states:
            if state == 'ALL':
                assigned_quotes = AssignedQuote.objects.filter(quotation__client=client)
            else:
                assigned_quotes = AssignedQuote.objects.filter(quotation__client=client, state=state)
            assigned_quote_serializer = ListAssignedQuoteSerializer(assigned_quotes, many=True)
            return Response(assigned_quote_serializer.data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='assigned-quotes-sucursal/(?P<sucursal>\w+)/(?P<state>\w+)')
    def get_assigned_quotes_sucursal(self, request, sucursal:int, state:str):
        states = ["IN_PROGRESS","CANCELLED", "ACCEPTED",
        "FINISHED", "ALL"]
        if state in states:
            if state == 'ALL':
                assigned_quotes = AssignedQuote.objects.filter(seller__sucursal=sucursal)
            else:
                assigned_quotes = AssignedQuote.objects.filter(seller__sucursal=sucursal, state=state)
            assigned_quote_serializer = ListAssignedQuoteSerializer(assigned_quotes, many=True)
            return Response(assigned_quote_serializer.data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['GET'], url_path='finish-assigned-quote')
    def finish_assigned_quote(self, request, pk:int):
        assigned_quote = get_object_or_404(AssignedQuote, pk=pk)
        
        if assigned_quote.state == 'FINISHED':
            return Response({'error':'This assigned-quote is already finished'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED) 

        if assigned_quote.state != 'ACCEPTED':
            return Response({'error':'This assigned-quote is not ACCEPTED'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)        
        
        vehicle_sucursal = assigned_quote.quotation.vehicle_sucursal
        if vehicle_sucursal.quantity <= 0:
            return Response({'error':'El vehiculo correspondiente a la cotizacion no tiene unidades disponibles'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
        vehicle_sucursal.quantity = vehicle_sucursal.quantity - 1

        assigned_quote.state = 'FINISHED'

        vehicle_sucursal.save()
        assigned_quote.save()
        return Response(CreateAssignedQuoteSerializer(assigned_quote).data,
                        status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='cancel-assigned-quote')
    def cancel_assigned_quote(self, request, pk:int):
        assigned_quote = get_object_or_404(AssignedQuote, pk=pk)
        
        if assigned_quote.state == 'CANCELLED':
            return Response({'error':'This assigned-quote is already CANCELLED'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)    

        if assigned_quote.state != 'IN_PROGRESS':
            return Response({'error':'This assigned-quote cannot be CANCELLED'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)    

        try:
            assigned_quote_id = assigned_quote.quotation.id
            client_email = assigned_quote.quotation.client.email
            send_mail(
                    'Cotizacion Cancelada',
                    f'Su cotizacion con id {assigned_quote_id} fue cancelada',
                    'settings.EMAIL_HOST_USER',
                    [client_email],
                    fail_silently=False,
                )
        except:
            return Response({'error':'No se logro enviar el email'},
                               status=status.HTTP_400_BAD_REQUEST)

        assigned_quote.state = 'CANCELLED'
        assigned_quote.save()
        return Response(CreateAssignedQuoteSerializer(assigned_quote).data,
                        status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='accept-assigned-quote')
    def accept_assigned_quote(self, request, pk:int):
        assigned_quote = get_object_or_404(AssignedQuote, pk=pk)
        
        if assigned_quote.state == 'ACCEPTED':
            return Response({'error':'This assigned-quote is already ACCEPTED'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)    

        if assigned_quote.state != 'IN_PROGRESS':
            return Response({'error':'This assigned-quote cannot be ACCEPTED'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)    

        try:
            assigned_quote_id = assigned_quote.quotation.id
            client_email = assigned_quote.quotation.client.email
            send_mail(
                    'Cotizacion Aceptada',
                    f'Su cotizacion con id {assigned_quote_id} fue aceptada',
                    'settings.EMAIL_HOST_USER',
                    [client_email],
                    fail_silently=False,
                )
        except:
            return Response({'error':'No se logro enviar el email'},
                               status=status.HTTP_400_BAD_REQUEST)

        assigned_quote.state = 'ACCEPTED'
        assigned_quote.save()
        return Response(CreateAssignedQuoteSerializer(assigned_quote).data,
                        status=status.HTTP_200_OK)