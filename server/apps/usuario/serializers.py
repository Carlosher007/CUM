from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Cliente

User = get_user_model()

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            password=self.validated_data['password'],
        )

        user.save()