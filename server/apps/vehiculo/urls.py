from django.urls import path, include
from rest_framework import routers
from apps.vehiculo import views

router = routers.DefaultRouter()
router.register(r'vehiculo', views.VehiculoView, 'vehiculo')

API_VERSION = 'v0.0'

urlpatterns = [
    path('{}/'.format(API_VERSION), include(router.urls))
]