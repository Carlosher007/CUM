from django.urls import path
from apps.cliente.views import ClienteAPIView


urlpatterns = [
    path('cliente/', ClienteAPIView.as_view())
]