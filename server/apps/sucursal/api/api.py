from django.shortcuts import get_object_or_404
from django.db.models import F 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status

from .. import views
from ..models import Sucursal, Vehicle, VehicleSucursal, User, Part, SucursalPart
from .serializer import (SucursalSerializer, VehicleSerializer, 
                         SucursalVehiclesSerializer, VehicleSucursalsSerializer, 
                         SucursalsStaffSerializer, VehicleSucursalSerializer,
                         ListPartSerializer, CreatePartSerializer, 
                         ListSucursalPartSerializer,
                         SucursalVehiclesColorSerializer,
                         CreateSucursalPartSerializer)
from apps.usuario.api.serializers import UserSerializer

class SucursalApiView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
    permission_classes = [IsAuthenticated]

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
    
    @action(detail=True, methods=['GET'], url_path='sucursal-parts')
    def get_sucursal_parts(self, request, pk:int):
        sucursal_parts = SucursalPart.objects.filter(sucursal=pk)
        list_sucursal_part_serializer = ListSucursalPartSerializer(
            sucursal_parts, many=True
        )
        return Response(list_sucursal_part_serializer.data,
                        status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'], url_path='sold-vehicles-sucursal/(?P<sucursal>\w+)')
    def get_sold_vehicles_sucursal(self, request, sucursal:int):
        sold_vehicles_sucursal = views.sold_vehicles_sucursal(sucursal)
        return Response(sold_vehicles_sucursal,
                        status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='sold-vehicles-client/(?P<client>\w+)')
    def get_sold_vehicles_client(self, request, client:str):
        sold_vehicles_client = views.sold_vehicles_client(client)
        return Response(sold_vehicles_client,
                        status=status.HTTP_200_OK)
        
class VehicleApiView(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

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
    permission_classes = [IsAuthenticated]

    def create(self, request):
        vehicle_sucursal_serializer = VehicleSucursalSerializer(data=request.data)
        if vehicle_sucursal_serializer.is_valid():
            vehicle_sucursal_serializer.save()
            return Response(vehicle_sucursal_serializer.data,
                            status=status.HTTP_201_CREATED) 
        else:
            if 'non_field_errors' in vehicle_sucursal_serializer.errors:
                if vehicle_sucursal_serializer.errors['non_field_errors'][0].code == 'unique':
                    try:
                        vehicle = VehicleSucursal.objects.filter(
                            sucursal=vehicle_sucursal_serializer.data['sucursal'],
                            vehicle=vehicle_sucursal_serializer.data['vehicle'],
                            color=vehicle_sucursal_serializer.data['color']
                        ).first()

                        vehicle.quantity = vehicle.quantity+vehicle_sucursal_serializer.data['quantity']
                        vehicle.save()

                        return Response(VehicleSucursalSerializer(vehicle).data,
                                        status=status.HTTP_200_OK)
                    except:
                        return Response({'error':'Datos invalidos o faltantes'},
                                        status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(vehicle_sucursal_serializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response(vehicle_sucursal_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class PartApiView(viewsets.ModelViewSet):
    serializer_class = CreatePartSerializer
    queryset = Part.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return ListPartSerializer
        return CreatePartSerializer
    
class SucursalPartApiView(viewsets.ModelViewSet):
    serializer_class = CreateSucursalPartSerializer
    queryset = SucursalPart.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return ListSucursalPartSerializer
        return CreateSucursalPartSerializer
    
    def create(self, request):
        create_sucursal_part_serializer = CreateSucursalPartSerializer(data=request.data)
        if create_sucursal_part_serializer.is_valid():
            create_sucursal_part_serializer.save()
            return Response(create_sucursal_part_serializer.data,
                            status=status.HTTP_201_CREATED) 
        else:
            if 'non_field_errors' in create_sucursal_part_serializer.errors:
                if create_sucursal_part_serializer.errors['non_field_errors'][0].code == 'unique':
                    try:
                        sucursal_part = SucursalPart.objects.filter(
                            sucursal=create_sucursal_part_serializer.data['sucursal'],
                            part=create_sucursal_part_serializer.data['part']
                        ).first()

                        sucursal_part.quantity = sucursal_part.quantity+create_sucursal_part_serializer.data['quantity']
                        sucursal_part.save()

                        return Response(CreateSucursalPartSerializer(sucursal_part).data,
                                        status=status.HTTP_200_OK)
                    except:
                        return Response({'error':'Datos invalidos o faltantes'},
                                        status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(create_sucursal_part_serializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response(create_sucursal_part_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'], url_path='sucursal-parts/(?P<sucursal>\w+)')
    def get_sucursal_parts(self, request, sucursal:int):
        sucursal_parts = SucursalPart.objects.filter(
            sucursal=sucursal).annotate(
            part_name=F('part__name')).order_by('part_name').distinct(
            'part_name').values('part_name')
        return Response(sucursal_parts,
                        status=status.HTTP_200_OK)
        
    @action(detail=False, methods=['GET'], url_path='sucursal-vehicle-parts/(?P<sucursal>\w+)/(?P<vehicle>\w+)')
    def get_sucursal_vehicle_parts(self, request, sucursal:int, vehicle:int):
        vehicle_parts = SucursalPart.objects.filter(
            sucursal=sucursal, part__vehicle=vehicle
        )
        return Response(ListSucursalPartSerializer(vehicle_parts, many=True).data,
                        status=status.HTTP_200_OK)