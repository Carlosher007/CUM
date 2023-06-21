from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from ..models import Quotation, AssignedQuote
from .serializers import QuotationSerializer, AssignedQuoteSerializer

class QuotationApiView(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    queryset = Quotation.objects.all()

class AssignedQuoteApiView(viewsets.ModelViewSet):
    serializer_class = AssignedQuoteSerializer
    queryset = AssignedQuote.objects.all()

    @action(detail=False, methods=['GET'], url_path='assigned-quotes-seller/(?P<seller>\w+)/(?P<state>\w+)')
    def get_assigned_quotes_seller(self, request, seller:str, state:str):
        states = ["IN_PROGRESS","CANCELLED", "ACCEPTED",
        "FINISHED"]
        if state in states:
            assigned_quotes = AssignedQuote.objects.filter(seller=seller, state=state)
            assigned_quote_serializer = AssignedQuoteSerializer(assigned_quotes, many=True)
            return Response(assigned_quote_serializer.data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='assigned-quotes-client/(?P<client>\w+)/(?P<state>\w+)')
    def get_assigned_quotes_client(self, request, client:str, state:str):
        states = ["IN_PROGRESS","CANCELLED", "ACCEPTED",
        "FINISHED"]
        if state in states:
            assigned_quotes = AssignedQuote.objects.filter(quotation__client=client, state=state)
            assigned_quote_serializer = AssignedQuoteSerializer(assigned_quotes, many=True)
            return Response(assigned_quote_serializer.data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)