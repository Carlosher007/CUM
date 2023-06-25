
from rest_framework import serializers

from ..models import WorkOrder

from apps.sucursal.models import SucursalPart

class CreateWorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        exclude = ['state']

    def save(self, **kwargs):
        print(self.validated_data)
        work_order = WorkOrder.objects.create(
            client_vehicle=self.validated_data['client_vehicle'],
            date=self.validated_data['date'],
            description=self.validated_data['description'],
        )
        
        if 'parts' in self.validated_data:
            for sucursal_part in self.validated_data['parts']:
                if sucursal_part.quantity > 0:
                    sucursal_part.quantity -= 1
                    sucursal_part.save()
                    work_order.parts.add(sucursal_part)

        work_order.save()