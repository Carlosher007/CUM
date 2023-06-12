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

    def save(self):
        user = User(
            id=self.validated_data['id'],
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            rol=self.validated_data['rol'],
            cellphone=self.validated_data['cellphone'],
            full_name=self.validated_data['full_name'],
            address=self.validated_data['address'],
        )

        user.set_password(self.validated_data['password'])
        user.save()

class ValidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'rol']

class UserVerificationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']