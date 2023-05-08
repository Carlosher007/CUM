from django.urls import path, include
from rest_framework import routers
from car_dealership import views

router = routers.DefaultRouter()
router.register(r'vehiculo', views.VehiculoView, 'vehiculo')

urlpatterns = [
    path('api/', include(router.urls))
]