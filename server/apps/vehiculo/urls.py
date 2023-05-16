from django.urls import path, include
from rest_framework import routers
from apps.vehiculo import views

router = routers.DefaultRouter()
router.register(r'vehiculo', views.VehiculoView, 'vehiculo')


urlpatterns = [
    path('', include(router.urls))
]