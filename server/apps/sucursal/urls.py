from django.urls import path, include
from rest_framework import routers
from .views import SucursalAPIView, VehiculoView

router = routers.DefaultRouter()
router.register(r'vehiculo', VehiculoView, 'vehiculo')

urlpatterns = [
    path('sucursal/', SucursalAPIView.as_view()),
    path('', include(router.urls)),
]