from rest_framework import serializers
from ..models import Sucursal, Vehicle, VehicleSucursal

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class SucursalsStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        exclude = ['vehicles']

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class SucursalVehiclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        exclude = ['id', 'sucursal']

class VehicleSucursalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        fields = ['sucursal']