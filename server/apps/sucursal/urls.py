from django.urls import path, include
from rest_framework import routers
from .api.api import VehicleApiView, SucursalApiView

router = routers.DefaultRouter()
router.register(r'vehicle', VehicleApiView, 'vehicle')
router.register(r'sucursal', SucursalApiView, 'sucursal')

urlpatterns = [
    path('', include(router.urls)),
]