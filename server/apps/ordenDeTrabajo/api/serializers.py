
from rest_framework import serializers

from ..models import WorkOrder

from apps.sucursal.models import SucursalPart, VehicleSucursal
from apps.cotizacion.models import AssignedQuote, Quotation
from apps.usuario.api.serializers import UserSerializer

class CreateWorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = '__all__'

class WorkOrderVehicleSucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        fields = ['vehicle', 'color']
        depth = 1

class WorkOrderQuotationSerializer(serializers.ModelSerializer):
    vehicle_sucursal = WorkOrderVehicleSucursalSerializer()
    class Meta:
        model = Quotation
        fields = ['vehicle_sucursal', 'id']

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