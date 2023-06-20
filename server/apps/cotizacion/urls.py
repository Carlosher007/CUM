from django.urls import path, include
from rest_framework import routers
from .api.api import QuotationApiView, AssignedQuoteApiView

router = routers.DefaultRouter()
router.register(r'quotation', QuotationApiView)
router.register(r'assigned-quote', AssignedQuoteApiView)

urlpatterns = [
    path('', include(router.urls)),
]