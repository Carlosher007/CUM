from django.urls import path, include
from rest_framework import routers
from .api.api import VehiculoView#, SucursalAPIView

router = routers.DefaultRouter()
router.register(r'vehiculo', VehiculoView, 'vehiculo')

urlpatterns = [
    #path('sucursal/', SucursalAPIView.as_view()),
    path('', include(router.urls)),
]