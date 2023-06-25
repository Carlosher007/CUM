
from rest_framework import serializers

from ..models import WorkOrder

from apps.sucursal.models import SucursalPart
from apps.cotizacion.models import AssignedQuote, Quotation
from apps.usuario.api.serializers import UserSerializer

class CreateWorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = '__all__'

class WorkOrderQuotationSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    class Meta:
        model = Quotation
        fields = ['client']

class WorkOrderAssignedQuoteSerializer(serializers.ModelSerializer):
    quotation = WorkOrderQuotationSerializer()
    class Meta:
        model = AssignedQuote
        fields = ['quotation']

class ListWorkOrderSerializer(serializers.ModelSerializer):
    client_vehicle = WorkOrderAssignedQuoteSerializer()
    class Meta:
        model = WorkOrder
        fields = '__all__'