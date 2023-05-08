from rest_framework import viewsets
from .serializers import VehiculoSerializer
from .models import Vehiculo

# Create your views here.
class VehiculoView(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    queryset = Vehiculo.objects.all()