from django.db import models

# Create your models here.
class Sucursal(models.Model):
    id = models.AutoField(primary_key=True)
    cedula_gerente = models.CharField(max_length=10, unique=True)
    cedula_jefe_taller = models.CharField(max_length=10, unique=True)
    ciudad = models.CharField(max_length=40)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=13)

    class Meta:
        db_table = 'sucursal'

class Vehiculo(models.Model):
    OPCIONES_CARROCERIAS = (
        ("SEDAN", "Sedan"),
        ("HATCHBACK", "Hatchback"),
        ("SUV", "Suv"),
        ("CROSSOVER", "Crossover"),
        ("FURGONETA", "Furgoneta"),
    )

    OPCIONES_MOTOR = (
        ("SIP", "Motor Electrico Sincrono de Imanes Permanentes"),
        ("CC", "Motor Electrico de Corriente Continua"),
        ("I", "Motor de Induccion"),
    )

    OPCIONES_FRENOS = (
        ("D4X4", "Frenos de Disco en las Cuatro Ruedas"),
        ("D4x2", "Frenos de Tambor en las Ruedas Traseras"),
        ("EBA", "Emergency Brake Assist"),
        ("ABS", "Antiblockiersystem"),
    )

    OPCIONES_SUSPENSION = (
        ("SI4x4", "Suspension Independiente en las Cuatro Ruedas"),
        ("SI2x4", "Suspension de Doble Horquilla en la Parte Delantera"),
        ("SMP", "Suspension MacPherson"),
    )

    modelo = models.CharField(max_length=50, primary_key=True)
    year = models.PositiveSmallIntegerField()
    marca = models.CharField(max_length=50)
    carroceria = models.CharField(max_length=50, choices=OPCIONES_CARROCERIAS)
    puertas = models.PositiveSmallIntegerField()
    motor = models.CharField(max_length=100, choices=OPCIONES_MOTOR)
    potencia = models.PositiveSmallIntegerField()
    rango = models.PositiveSmallIntegerField()
    capacidad_bateria = models.PositiveSmallIntegerField()
    tiempo_carga = models.PositiveSmallIntegerField()
    velocidad_maxima = models.PositiveSmallIntegerField()
    frenos = models.CharField(max_length=100, choices=OPCIONES_FRENOS)
    suspension = models.CharField(max_length=100, choices=OPCIONES_SUSPENSION)
    img_url = models.CharField(max_length=100)
    precio = models.IntegerField()
    descripcion = models.TextField()

    class Meta:
        db_table = 'vehiculo'
        unique_together = (('modelo', 'year'),)