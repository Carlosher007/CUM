from django.urls import path, include
from rest_framework import routers
from .api.api import (VehicleApiView, SucursalApiView, 
                      VehicleSucursalApiView, PartApiView)

router = routers.DefaultRouter()
router.register(r'vehicle', VehicleApiView, 'vehicle')
router.register(r'sucursal', SucursalApiView, 'sucursal')
router.register(r'vehicle-sucursal', VehicleSucursalApiView, 'vehicle-sucursal')
router.register(r'part', PartApiView, 'part')

urlpatterns = [
    path('', include(router.urls)),
]