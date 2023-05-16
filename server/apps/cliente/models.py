from django.db import models
from django.contrib.auth.hashers import make_password
from apps.sucursal.models import Sucursal

# Create your models here.
class Cliente(models.Model):
    cedula = models.CharField(max_length=10, primary_key=True)
    celular = models.CharField(max_length=10)
    nombre_completo = models.CharField(max_length=100)
    email = models.EmailField()
    direccion = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=50, null=False)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    class Meta:
        db_table = 'cliente'

    def save(self, *args, **kwargs):
        # Encriptamos la contraseña
        self.contraseña = make_password(self.contraseña)
        super(Cliente, self).save(*args, **kwargs)