from rest_framework import serializers
from ..models import QuotationRequest

class QuotationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuotationRequest
        fields = '__all__'
        only_read_fields = ['id']