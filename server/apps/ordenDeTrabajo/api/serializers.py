from rest_framework import serializers
from ..models import WorkOrder

class CreateWorkOrderSerializer(serializers.ModelSerializer):
    #sucursal_part_ids = serializers.ListField(
    #    child=serializers.IntegerField(min_value=0), required=False
    #    )
    class Meta:
        model = WorkOrder
        fields = '__all__'