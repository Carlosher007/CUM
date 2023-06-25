from django.urls import path, include
from rest_framework import routers
from .api.api import WorkOrderApiView

router = routers.DefaultRouter()
router.register(r'work_order', WorkOrderApiView)

urlpatterns = [
    path('', include(router.urls)),
]