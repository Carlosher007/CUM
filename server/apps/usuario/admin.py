from django.contrib import admin
from .models import Gerente, JefeTaller, Cliente

# Register your models here.
admin.site.register(Gerente)
admin.site.register(JefeTaller)
admin.site.register(Cliente)