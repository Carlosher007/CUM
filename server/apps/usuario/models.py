from typing import Iterable, Optional
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password

# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ("Gerente", "G"),
        ("Cliente", "C"),
        ("JefeTaller", "JT"),
        ("Vendedor", "V"),
    )

    id = models.CharField(max_length=10, primary_key=True)
    email = models.CharField(max_length=254, unique=True)
    rol = models.CharField(max_length=15, choices=ROLES)
    cellphone = models.CharField(max_length=10)
    full_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    sucursal = models.ForeignKey('sucursal.Sucursal', on_delete=models.CASCADE, null=True, blank=True, related_name='user_rel')

    username = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(null=False, default=False)
    is_active = models.BooleanField(null=False, default=True)
    is_superuser = models.BooleanField(null=False, default=False)
    last_login = models.DateTimeField(null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    class Meta:
        db_table = 'user'

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        self.username = self.email
        return super(User, self).save(*args, **kwargs)
