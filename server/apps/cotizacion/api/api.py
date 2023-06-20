from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from ..models import Quotation, AssignedQuote
from .serializers import QuotationSerializer, AssignedQuoteSerializer

class QuotationApiView(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    queryset = Quotation.objects.all()

class AssignedQuoteApiView(viewsets.ModelViewSet):
    serializer_class = AssignedQuoteSerializer
    queryset = AssignedQuote.objects.all()

    