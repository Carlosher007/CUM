from django.urls import path
from .views import SucursalAPIView

urlpatterns = [
    path('sucursal/', SucursalAPIView.as_view()),
]