from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'rol', 
            'cellphone', 
            'full_name', 
            'address',
            'password',
            'sucursal'
            ]
        extra_kwargs = {'password': {'write_only': True},
                        'sucursal': {'required': True}}

class ValidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'rol']

class UserVerificationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']