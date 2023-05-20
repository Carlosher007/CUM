from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Cliente, Usuario


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'rol']

    def save(self):
        user = Usuario(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            password=self.validated_data['password'],
            rol=self.validated_data['rol'],
        )

        user.save()