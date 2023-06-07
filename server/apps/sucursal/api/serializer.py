from rest_framework import serializers
from ..models import Sucursal, Vehicle, VehicleSucursal

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class SucursalVehiclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        exclude = ['id', 'sucursal']