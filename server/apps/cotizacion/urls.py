from django.urls import path, include
from rest_framework import routers
from .api.api import QuotationRequestApiView

router = routers.DefaultRouter()
router.register(r'quotation_request', QuotationRequestApiView, 'quotation_request')

urlpatterns = [
    path('', include(router.urls)),
]