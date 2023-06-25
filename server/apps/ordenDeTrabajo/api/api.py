from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import WorkOrder
from .serializers import CreateWorkOrderSerializer

from apps.sucursal.models import SucursalPart

class WorkOrderApiView(viewsets.ModelViewSet):
    serializer_class = CreateWorkOrderSerializer
    queryset = WorkOrder.objects.all()