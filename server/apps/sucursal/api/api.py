from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets, status
from ..models import Sucursal, Vehicle, VehicleSucursal
from .serializer import SucursalSerializer, VehicleSerializer, SucursalVehiclesSerializer, VehicleSucursalsSerializer

# Create your views here.
# class SucursalAPIView(APIView):

#     def get(self, request):
#         users = User.objects.all().select_related('cedula')
#         lista_sucursales = []
#         for user in users: 
#             sucursal = user.cedula
#             jefe_taller = JefeTaller.objects.filter(cedula=sucursal.cedula_jefe_taller).first()
#             sucursal_ = {
#                 'id':sucursal.id,
#                 'ciudad':sucursal.ciudad,
#                 'direccion':sucursal.direccion,
#                 'telefono':sucursal.telefono,
#                 'nombre_User':User.nombre_completo,
#                 'nombre_jefe_taller':jefe_taller.nombre_completo
#             }
#             lista_sucursales.append(sucursal_)

#         return Response(lista_sucursales)


class SucursalApiView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()

    @action(detail=False, methods=['GET'], url_path='sucursals-staff')
    def get_sucursals_staff(self, request):
        sucursales = Sucursal.objects.all()
        sucursales_response = []
        for sucursal in sucursales:
            sucursal_ = SucursalSerializer(sucursal).data
            sucursal_['staff'] = sucursal.staff()
            sucursales_response.append(sucursal_)
        return Response(sucursales_response, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='sucursal-vehicles')
    def get_sucursal_vehicles(self, request, pk:int):
        sucursal_vehicles = VehicleSucursal.objects.filter(sucursal=pk)
        sucursal_vehicles_serializer = SucursalVehiclesSerializer(sucursal_vehicles, many=True)
        return Response(sucursal_vehicles_serializer.data,
                        status=status.HTTP_200_OK)
    
class VehicleApiView(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()

    @action(detail=True, methods=['GET'], url_path='vehicle-sucursals')
    def get_vehicle_sucursals(self, request, pk:int):
        vehicle_sucursals = VehicleSucursal.objects.filter(
            vehicle=pk, 
            quantity__gt=0
            ).order_by('sucursal').distinct('sucursal')
        vehicle_sucursals_serializer = VehicleSucursalsSerializer(vehicle_sucursals, many=True)
        return Response(vehicle_sucursals_serializer.data,
                        status=status.HTTP_200_OK)