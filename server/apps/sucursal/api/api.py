from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets, status
from ..models import Sucursal, Vehicle, VehicleSucursal, User, Part, SucursalPart
from .serializer import (SucursalSerializer, VehicleSerializer, 
                         SucursalVehiclesSerializer, VehicleSucursalsSerializer, 
                         SucursalsStaffSerializer, VehicleSucursalSerializer,
                         PartSerializer, SucursalPartSerializer,
                         SucursalVehiclesColorSerializer)
from apps.usuario.api.serializers import UserSerializer

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
            sucursal_ = SucursalsStaffSerializer(sucursal).data
            sucursal_['staff'] = sucursal.staff()
            sucursales_response.append(sucursal_)
        return Response(sucursales_response, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='sucursal-vehicles')
    def get_sucursal_vehicles(self, request, pk:int):
        sucursal_vehicles = VehicleSucursal.objects.order_by('vehicle').distinct('vehicle').filter(sucursal=pk)
        sucursal_vehicles_serializer = SucursalVehiclesSerializer(sucursal_vehicles, many=True)
        return Response(sucursal_vehicles_serializer.data,
                        status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='sucursal-vehicles-color')
    def get_sucursal_vehicles_color(self, request, pk:int):
        sucursal_vehicles = VehicleSucursal.objects.filter(sucursal=pk)
        sucursal_vehicles_color_serializer = SucursalVehiclesColorSerializer(sucursal_vehicles, many=True)
        return Response(sucursal_vehicles_color_serializer.data,
                        status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='sucursal-users')
    def get_sucursal_users(self, request, pk:int):
        try:
            sucursal = Sucursal.objects.get(pk=pk)
            sucursal_users = User.objects.filter(sucursal=pk)
            user_serializer = UserSerializer(sucursal_users, many=True)
            return Response(user_serializer.data,
                        status=status.HTTP_200_OK)
        except:
            return Response({'error':'La sucursal dada no existe'},
                            status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['GET'], url_path='(?P<vehicle>\w+)/vehicle-colors')
    def get_available_colors_vehicle(self, request, pk:int, vehicle:int):
        available_colors_vehicle = VehicleSucursal.objects.filter(
            sucursal=pk, vehicle=vehicle
        ).values('color')
        return Response(available_colors_vehicle,
                        status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'], url_path='(?P<vehicle>\w+)/(?P<color>\w+)/vehicle-sucursal-id')
    def get_id_vehicle_sucursal(self, request, pk:int, vehicle:int, color:str):
        vehicle = Vehicle.objects.filter(id=vehicle)
        if vehicle.exists():
            vehicle = vehicle.first()
            vehicle_sucursal = VehicleSucursal.objects.filter(sucursal=pk,
                                                              vehicle=vehicle.id,
                                                              color='#'+color)
            if vehicle_sucursal.exists():
                vehicle_sucursal = vehicle_sucursal.first()
                return Response(VehicleSucursalSerializer(vehicle_sucursal).data,
                                status=status.HTTP_200_OK)

            return Response({'error': 'No existe un vehiculo en la sucursal dada que coincida con los parametros dados o la sucursal no existe'},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'No existe un vehiculo que coincida con la id dada'},
                        status=status.HTTP_400_BAD_REQUEST)
        
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
    
class VehicleSucursalApiView(viewsets.ModelViewSet):
    serializer_class = VehicleSucursalSerializer
    queryset = VehicleSucursal.objects.all()

    def create(self, request):
        vehicle_sucursal_serializer = VehicleSucursalSerializer(data=request.data)
        if vehicle_sucursal_serializer.is_valid():
            vehicle_sucursal_serializer.save()
            return Response(vehicle_sucursal_serializer.data,
                            status=status.HTTP_201_CREATED) 
        else:
            if 'non_field_errors' in vehicle_sucursal_serializer.errors:
                if vehicle_sucursal_serializer.errors['non_field_errors'][0].code == 'unique':
                    vehicle = VehicleSucursal.objects.filter(
                        sucursal=vehicle_sucursal_serializer.data['sucursal'],
                        vehicle=vehicle_sucursal_serializer.data['vehicle'],
                        color=vehicle_sucursal_serializer.data['color']
                    ).first()

                    vehicle.quantity = vehicle.quantity+vehicle_sucursal_serializer.data['quantity']
                    vehicle.save()

                    return Response(VehicleSucursalSerializer(vehicle).data,
                                    status=status.HTTP_200_OK)
                else:
                    return Response(vehicle_sucursal_serializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response(vehicle_sucursal_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class PartApiView(viewsets.ModelViewSet):
    serializer_class = PartSerializer
    queryset = Part.objects.all()
    
class SucursalPartApiView(viewsets.ModelViewSet):
    serializer_class = SucursalPartSerializer
    queryset = SucursalPart.objects.all()