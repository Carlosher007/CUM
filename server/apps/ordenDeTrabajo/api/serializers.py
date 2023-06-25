
from rest_framework import serializers

from ..models import WorkOrder

from apps.sucursal.models import SucursalPart

class CreateWorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = '__all__'