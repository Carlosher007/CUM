from django.shortcuts import get_object_or_404
from django.core.mail import send_mail

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import WorkOrder
from .serializers import CreateWorkOrderSerializer, ListWorkOrderSerializer, UserSerializer

from apps.usuario.models import User

class WorkOrderApiView(viewsets.ModelViewSet):
    serializer_class = CreateWorkOrderSerializer
    queryset = WorkOrder.objects.all()

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return ListWorkOrderSerializer
        return CreateWorkOrderSerializer

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
    
    @action(detail=False, methods=['GET'], url_path='work-orders-sucursal/(?P<sucursal>\w+)/(?P<state>\w+)')
    def get_work_orders_sucursal(self, request, sucursal:int, state:str):
        states = ["SENT","CANCELLED", "FINISHED", "ALL"]
        if state in states:
            jefe_taller = User.objects.filter(
                    sucursal=sucursal, rol='JefeTaller'
                ).first()
            jefe_taller = UserSerializer(jefe_taller).data

            if state == "ALL":
                work_orders_sucursal = WorkOrder.objects.filter(
                    client_vehicle__quotation__vehicle_sucursal__sucursal=sucursal
                )
                work_orders = ListWorkOrderSerializer(work_orders_sucursal, many=True).data
            else:
                work_orders_sucursal = WorkOrder.objects.filter(
                    client_vehicle__quotation__vehicle_sucursal__sucursal=sucursal,
                    state=state
                )
                work_orders = ListWorkOrderSerializer(work_orders_sucursal, many=True).data

            data = {
                'work_orders':work_orders,
                'jefe_taller':jefe_taller
            }
            return Response(data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='work-orders-client/(?P<client>\w+)/(?P<state>\w+)')
    def get_work_orders_client(self, request, client:str, state:str):
        states = ["SENT","CANCELLED", "FINISHED", "ALL"]
        if state in states:
            jefe_taller = None
            if state == "ALL":
                work_orders_sucursal = WorkOrder.objects.filter(
                    client_vehicle__quotation__client=client
                )
                work_orders = ListWorkOrderSerializer(work_orders_sucursal, many=True).data
            else:
                work_orders_sucursal = WorkOrder.objects.filter(
                    client_vehicle__quotation__client=client,
                    state=state
                )
                work_orders = ListWorkOrderSerializer(work_orders_sucursal, many=True).data
            if work_orders_sucursal.exists():
                sucursal = work_orders_sucursal.first().client_vehicle.quotation.vehicle_sucursal.sucursal
                jefe_taller = User.objects.filter(
                        sucursal=sucursal, rol='JefeTaller'
                    ).first()
                jefe_taller = UserSerializer(jefe_taller).data

            data = {
                'work_orders':work_orders,
                'jefe_taller':jefe_taller
            }
            return Response(data,
                            status=status.HTTP_200_OK)
        
        return Response({'error':'invalid state', 'states':states},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['GET'], url_path='cancel-order-work')
    def cancel_order_work(self, request, pk:int):
        work_order = get_object_or_404(WorkOrder, pk=pk)

        if work_order.state != 'SENT':
            return Response({'error':'Accion no permitida debido a que '
                             +'la orden esta {}'.format(work_order.state)},
                             status=status.HTTP_405_METHOD_NOT_ALLOWED)
        email_client = work_order.client_vehicle.quotation.client.email
        sucursal = work_order.client_vehicle.quotation.vehicle_sucursal.sucursal
        email_jefe_taller = User.objects.filter(
                        sucursal=sucursal, rol='JefeTaller'
                    ).first().email
        
        encabezado_email = 'Orden de Trabajo Cancelada'
        mensaje = 'Su orden de trabajo con id {} fue cancelada'.format(work_order.id)
        try:
            send_mail(
                encabezado_email,
                mensaje,
                'settings.EMAIL_HOST_USER',
                [email_client],
                fail_silently=False,
            )
            send_mail(
                encabezado_email,
                mensaje,
                'settings.EMAIL_HOST_USER',
                [email_jefe_taller],
                fail_silently=False,
            )
        except:
            print('No logro enviar los emails')

        work_order.state = 'CANCELLED'
        work_order.save()

        return Response(CreateWorkOrderSerializer(work_order).data,
                        status=status.HTTP_200_OK)
    

    @action(detail=True, methods=['GET'], url_path='finish-order-work')
    def finish_order_work(self, request, pk:int):
        work_order = get_object_or_404(WorkOrder, pk=pk)

        if work_order.state != 'SENT':
            return Response({'error':'Accion no permitida debido a que '
                             +'la orden esta {}'.format(work_order.state)},
                             status=status.HTTP_405_METHOD_NOT_ALLOWED)
        email_client = work_order.client_vehicle.quotation.client.email
        
        encabezado_email = 'Orden de Trabajo Finalizada'
        mensaje = 'Su orden de trabajo con id {} fue finalizada'.format(work_order.id)
        try:
            send_mail(
                encabezado_email,
                mensaje,
                'settings.EMAIL_HOST_USER',
                [email_client],
                fail_silently=False,
            )
        except:
            print('No logro enviar los emails')

        work_order.state = 'FINISHED'
        work_order.save()

        return Response(CreateWorkOrderSerializer(work_order).data,
                        status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'], url_path='client-has-order-work/(?P<client_vehicle>\w+)')
    def client_has_order_work(self, request, client_vehicle:str):
        work_orders = WorkOrder.objects.filter(
                    client_vehicle=client_vehicle,
                    state='SENT'
                )
        response = True
        message = 'El cliente no tiene ninguna orden de trabajo en curso con este carro'
        if work_orders.exists():
            response = False
            message = 'El cliente ya tiene una orden de trabajo en curso con este carro'

        return Response({
            'response':response,
            'message':message
        }, status=status.HTTP_200_OK)