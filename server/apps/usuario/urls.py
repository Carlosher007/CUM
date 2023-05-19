from django.urls import path
from apps.usuario.views import ClienteAPIView


urlpatterns = [
    path('cliente/', ClienteAPIView.as_view())
]