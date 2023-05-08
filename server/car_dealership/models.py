from django.db import models

# Create your models here.
class Vehiculo(models.Model):
    nombre = models.CharField(max_length=200, primary_key=True)
    frenos_abs = models.BooleanField()
    asientos = models.IntegerField()
    potencia = models.IntegerField()
    precio = models.IntegerField()
    traccion = models.CharField(max_length=200)
    velocidad_maxima = models.IntegerField()
    torque = models.IntegerField()
    peso = models.IntegerField()
    alto = models.IntegerField()
    ancho = models.IntegerField()
    largo = models.IntegerField()
    descripcion = models.TextField()
    velocidades = models.IntegerField()