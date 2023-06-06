from django.contrib import admin
from .models import Sucursal, Vehicle, VehicleSucursal

# Register your models here.

class VehicleSucursalInline(admin.TabularInline):
    model = VehicleSucursal
    extra = 1

class SucursalAdmin(admin.ModelAdmin):
    inlines = [VehicleSucursalInline,]
    filter_horizontal = ['vehicles',]


admin.site.register(Sucursal, SucursalAdmin)
admin.site.register(Vehicle)