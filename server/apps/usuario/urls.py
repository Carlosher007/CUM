from django.urls import path, include
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import routers
from .api.api import UserAPIView, ValidateUserView, LoginView, EmailVerificationCodeView, Logout

router = routers.DefaultRouter()
router.register(r'user', UserAPIView)

urlpatterns = [
    path('', include(router.urls)),
    path('validate-user/', ValidateUserView.as_view()),
    path('login/', LoginView.as_view()),
    path('verification-code/', EmailVerificationCodeView.as_view()),
    path('logout/', Logout.as_view()),
]