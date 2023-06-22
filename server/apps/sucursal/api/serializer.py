from rest_framework import serializers
from ..models import Sucursal, Vehicle, VehicleSucursal, Part, SucursalPart

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
        fields = ['vehicle']
        depth = 1

class SucursalVehiclesColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        exclude = ['sucursal']
        depth = 1

class VehicleSucursalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        fields = ['sucursal']

class VehicleSucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleSucursal
        fields = ['id', 'sucursal', 'vehicle', 'color', 'quantity']
        read_only_fields = ['id']

class ListPartSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer()
    class Meta:
        model = Part
        fields = '__all__'
        read_only_fields = ['id']

class CreatePartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'
        read_only_fields = ['id']
        extra_kwargs = {'vehicle': {'required': False}}

class ListSucursalPartSerializer(serializers.ModelSerializer):
    part = ListPartSerializer(read_only=True)
    class Meta:
        model = SucursalPart
        fields = '__all__'

class CreateSucursalPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = SucursalPart
        fields = '__all__'