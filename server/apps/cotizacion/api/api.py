from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import QuotationRequestSerializer
from ..models import QuotationRequest

class QuotationRequestApiView(viewsets.ModelViewSet):
    serializer_class = QuotationRequestSerializer
    queryset = QuotationRequest.objects.all()