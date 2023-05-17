from django.db import models
from apps.sucursal.models import Sucursal

# Create your models here.
class Gerente(models.Model):
    cedula = models.OneToOneField(Sucursal, on_delete=models.CASCADE, primary_key=True, to_field='cedula_gerente')
    nombre_completo = models.CharField(max_length=50)
    celular = models.CharField(max_length=10)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=20)

    class Meta:
        db_table = 'gerente'

class JefeTaller(models.Model):
    cedula = models.OneToOneField(Sucursal, on_delete=models.CASCADE, primary_key=True, to_field='cedula_jefe_taller')
    nombre_completo = models.CharField(max_length=50)
    celular = models.CharField(max_length=10)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=20)

    class Meta:
        db_table = 'jefe_taller'