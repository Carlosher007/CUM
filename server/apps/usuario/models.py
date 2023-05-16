from django.db import models
from apps.sucursal.models import Sucursal

# Create your models here.
class Gerente(models.Model):
    cedula = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    nombre_completo = models.CharField(max_length=50)
    celular = models.CharField(max_length=10)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=20)

    class Meta:
        db_table = 'gerente'