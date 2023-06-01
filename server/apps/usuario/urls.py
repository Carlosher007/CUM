from django.urls import path, include
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import routers
from .api.api import UserAPIView, LoginView

router = routers.DefaultRouter()
router.register(r'user', UserAPIView)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
]