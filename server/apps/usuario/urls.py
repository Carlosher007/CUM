from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken

from .api.api import ClienteAPIView, LoginView


urlpatterns = [
    path('cliente/', ClienteAPIView.as_view()),
    path('login/', LoginView.as_view()),
]