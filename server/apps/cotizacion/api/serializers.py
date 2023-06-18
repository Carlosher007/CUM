from rest_framework import serializers
from ..models import Quotation

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['id']