from rest_framework import serializers
from apps.sucursal.api.serializer import VehicleSucursalSerializer
from ..models import Quotation, AssignedQuote

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['id']

class ListQuotationSerializer(serializers.ModelSerializer):
    vehicle_sucursal = VehicleSucursalSerializer()
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['id']

class AssignedQuoteSerializer(serializers.ModelSerializer):
    quotation = ListQuotationSerializer()
    class Meta:
        model = AssignedQuote
        fields = '__all__'