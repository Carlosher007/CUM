from django.urls import path, include
from rest_framework import routers
from .api.api import QuotationApiView

router = routers.DefaultRouter()
router.register(r'quotation', QuotationApiView)

urlpatterns = [
    path('', include(router.urls)),
]