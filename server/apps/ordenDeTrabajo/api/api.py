
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import WorkOrder
from .serializers import CreateWorkOrderSerializer, ListWorkOrderSerializer, UserSerializer

from apps.usuario.models import User

class WorkOrderApiView(viewsets.ModelViewSet):
    serializer_class = CreateWorkOrderSerializer
    queryset = WorkOrder.objects.all()

    def create(self, request):
        create_work_order_serializer = CreateWorkOrderSerializer(data=request.data)
        if create_work_order_serializer.is_valid():
            work_order = WorkOrder.objects.filter(
                client_vehicle=create_work_order_serializer.validated_data['client_vehicle'],
                state='SENT'
            )
            if work_order.exists():
                return Response({'error':'Ya tiene una orden de trabajo enviada'},
                                 status=status.HTTP_405_METHOD_NOT_ALLOWED)

            work_order = WorkOrder.objects.create(
                client_vehicle=create_work_order_serializer.validated_data['client_vehicle'],
                date=create_work_order_serializer.validated_data['date'],
                description=create_work_order_serializer.validated_data['description'],
            )
            
            if 'parts' in create_work_order_serializer.validated_data:
                total_price = 0
                for sucursal_part in create_work_order_serializer.validated_data['parts']:
                    if sucursal_part.quantity > 0:
                        sucursal_part.quantity -= 1
                        work_order.parts.add(sucursal_part)
                    else:
                        part_id = sucursal_part.id
                        work_order.delete()
                        return Response({'error':'La parte {} no tiene stock'.format(part_id)},
                                        status=status.HTTP_400_BAD_REQUEST)
                for sucursal_part in create_work_order_serializer.validated_data['parts']:
                    total_price += sucursal_part.part.price
                    sucursal_part.save()
                work_order.total_price = total_price

            work_order.save()
            return Response(CreateWorkOrderSerializer(work_order).data,
                            status=status.HTTP_201_CREATED)

        return Response(create_work_order_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='work-orders-sucursal/(?P<sucursal>\w+)')
    def get_work_orders_sucursal(self, request, sucursal:int):
        work_orders_sucursal = WorkOrder.objects.filter(
            client_vehicle__quotation__vehicle_sucursal__sucursal=sucursal
        )
        data = ListWorkOrderSerializer(work_orders_sucursal, many=True).data
        jefe_taller = User.objects.filter(
            sucursal=sucursal, rol='JefeTaller'
        ).first()
        jefe_taller = UserSerializer(jefe_taller).data
        data = {
            'work_orders':data,
            'jefe_taller':jefe_taller
        }
        return Response(data,
                        status=status.HTTP_200_OK)