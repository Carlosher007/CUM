from django.db import models

# Create your models here.
class Sucursal(models.Model):
    id = models.AutoField(primary_key=True)
    cedula_gerente = models.CharField(max_length=10)
    cedula_jefe_taller = models.CharField(max_length=10)
    ciudad = models.CharField(max_length=40)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=13)

    class Meta:
        db_table = 'sucursal'