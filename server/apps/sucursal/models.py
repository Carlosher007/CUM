from django.db import models
from apps.usuario.models import User
from apps.usuario.api.serializers import UserSerializer

# Create your models here.
class Sucursal(models.Model):
    city = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    cellphone = models.CharField(max_length=13)

    class Meta:
        db_table = 'sucursal'

    def staff(self):
        staff = User.objects.filter(sucursal=self.id).exclude(rol='Cliente')
        user_serializer = UserSerializer(staff, many=True)
        return user_serializer.data

class Vehicle(models.Model):
    BODYWORK_CHOICES = (
        ("SEDAN", "Sedan"),
        ("HATCHBACK", "Hatchback"),
        ("SUV", "Suv"),
        ("CROSSOVER", "Crossover"),
        ("FURGONETA", "Furgoneta"),
    )

    MOTOR_CHOICES = (
        ("SIP", "Motor Electrico Sincrono de Imanes Permanentes"),
        ("CC", "Motor Electrico de Corriente Continua"),
        ("I", "Motor de Induccion"),
    )

    BRAKES_CHOICES = (
        ("D4X4", "Frenos de Disco en las Cuatro Ruedas"),
        ("D4x2", "Frenos de Tambor en las Ruedas Traseras"),
        ("EBA", "Emergency Brake Assist"),
        ("ABS", "Antiblockiersystem"),
    )

    SUSPENSION_CHOICES = (
        ("SI4x4", "Suspension Independiente en las Cuatro Ruedas"),
        ("SI2x4", "Suspension de Doble Horquilla en la Parte Delantera"),
        ("SMP", "Suspension MacPherson"),
    )

    model = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    brand = models.CharField(max_length=50)
    bodywork = models.CharField(max_length=50, choices=BODYWORK_CHOICES)
    doors = models.PositiveSmallIntegerField()
    motor = models.CharField(max_length=100, choices=MOTOR_CHOICES)
    potency = models.PositiveSmallIntegerField()
    range = models.PositiveSmallIntegerField()
    battery_capacity = models.PositiveSmallIntegerField()
    charging_time = models.PositiveSmallIntegerField()
    top_speed = models.PositiveSmallIntegerField()
    brakes = models.CharField(max_length=100, choices=BRAKES_CHOICES)
    suspension = models.CharField(max_length=100, choices=SUSPENSION_CHOICES)
    img_url = models.CharField(max_length=500)
    price = models.IntegerField()
    description = models.TextField()
    sucursal = models.ManyToManyField(Sucursal)

    class Meta:
        db_table = 'vehicle'