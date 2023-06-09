from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'email', 
            'rol', 
            'cellphone', 
            'full_name', 
            'address',
            'password',
            'sucursal'
            ]
        extra_kwargs = {'password': {'write_only': True, 'required': False},
                        'sucursal': {'required': True}}
        
        def create(self, validated_data):
            user = User.objects.create(**validated_data)
            return user

class ValidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'rol']

class UserVerificationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']