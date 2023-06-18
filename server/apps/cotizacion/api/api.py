from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from ..models import Quotation
from .serializers import QuotationSerializer

class QuotationApiView(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    queryset = Quotation.objects.all()