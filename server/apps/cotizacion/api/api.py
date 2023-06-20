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

    @action(detail=False, methods=['GET'], url_path='assigned-quotes-seller/(?P<seller>\w+)')
    def get_assigned_quotes_seller(self, request, seller:str):
        assigned_quotes = AssignedQuote.objects.filter(seller=seller)
        assigned_quote_serializer = AssignedQuoteSerializer(assigned_quotes, many=True)
        return Response(assigned_quote_serializer.data,
                        status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'], url_path='assigned-quotes-client/(?P<client>\w+)')
    def get_assigned_quotes_client(self, request, client:str):
        assigned_quotes = AssignedQuote.objects.filter(quotation__client=client)
        assigned_quote_serializer = AssignedQuoteSerializer(assigned_quotes, many=True)
        return Response(assigned_quote_serializer.data,
                        status=status.HTTP_200_OK)