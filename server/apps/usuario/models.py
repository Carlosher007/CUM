from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
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

class Cliente(models.Model):
    cedula = models.CharField(max_length=10, primary_key=True)
    celular = models.CharField(max_length=10)
    nombre_completo = models.CharField(max_length=100)
    email = models.EmailField()
    direccion = models.CharField(max_length=100)
    password = models.CharField(max_length=50, null=False)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    class Meta:
        db_table = 'cliente'

    def save(self, *args, **kwargs):
        # Encriptamos la contraseña
        self.password = make_password(self.password)
        super(Cliente, self).save(*args, **kwargs)

class Usuario(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ("Gerente", "G"),
        ("Cliente", "C"),
        ("JefeTaller", "JT"),
        ("Vendedor", "V"),
    )

    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=254, unique=True)
    is_staff = models.BooleanField(null=False, default=False)
    is_active = models.BooleanField(null=False, default=True)
    is_superuser = models.BooleanField(null=False, default=False)
    last_login = models.DateTimeField(null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    rol = models.CharField(max_length=15, choices=ROLES)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    class Meta:
        db_table = 'usuario'
