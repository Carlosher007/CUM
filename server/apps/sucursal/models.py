from django.db import models
from apps.usuario.models import User
from apps.usuario.api.serializers import UserSerializer

# Create your models here.
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
        ("D4x4", "Frenos de Disco en las Cuatro Ruedas"),
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

    class Meta:
        db_table = 'vehicle'

class Part(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE,
                                blank=True, null=True)
    
    class Meta:
        db_table = 'part'
        unique_together = [['name', 'vehicle']]

class Sucursal(models.Model):
    city = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    cellphone = models.CharField(max_length=13)
    vehicles = models.ManyToManyField(
        Vehicle,
        through='VehicleSucursal',
        blank=True,
    )
    parts = models.ManyToManyField(
        Part,
        through='SucursalPart',
        blank=True
    )

    class Meta:
        db_table = 'sucursal'

    def staff(self):
        staff = User.objects.filter(sucursal=self.id).exclude(rol='Cliente')
        user_serializer = UserSerializer(staff, many=True)
        return user_serializer.data

class VehicleSucursal(models.Model):
    COLOR_CHOICES = (
        ("#FF0000", "Rojo"),
        ("#0000FF", "Azul"),
        ("#BF930D", "Amarillo"),
        ("#000000", "Negro"),
        ("#AAADAC", "Gris"),
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        blank=True, null=True
    )
    sucursal = models.ForeignKey(
        Sucursal,
        on_delete=models.CASCADE,
        blank=True, null=True
    )
    quantity = models.IntegerField(default=0)
    color = models.CharField(max_length=100, choices=COLOR_CHOICES)

    class Meta:
        db_table = 'vehicle_sucursal'
        unique_together = [['vehicle', 'sucursal', 'color']]

class SucursalPart(models.Model):
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE,
                                 blank=True, null=True)
    part = models.ForeignKey(Part, on_delete=models.CASCADE, 
                             blank=True, null=True)
    quantity = models.IntegerField(default=0)

    class Meta:
        db_table = 'sucursal_part'
        unique_together = [['sucursal', 'part']]