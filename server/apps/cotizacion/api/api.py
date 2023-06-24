from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from ..models import Quotation, AssignedQuote
from .serializers import (QuotationSerializer, CreateAssignedQuoteSerializer,
                          ListAssignedQuoteSerializer)

class QuotationApiView(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    queryset = Quotation.objects.all()

class AssignedQuoteApiView(viewsets.ModelViewSet):
    serializer_class = CreateAssignedQuoteSerializer
    queryset = AssignedQuote.objects.all()

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