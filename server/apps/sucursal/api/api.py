from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from ..models import Sucursal, Vehicle
from .serializer import SucursalSerializer, VehicleSerializer
from apps.usuario.models import User

# Create your views here.
# class SucursalAPIView(APIView):

#     def get(self, request):
#         users = User.objects.all().select_related('cedula')
#         lista_sucursales = []
#         for user in users: 
#             sucursal = user.cedula
#             jefe_taller = JefeTaller.objects.filter(cedula=sucursal.cedula_jefe_taller).first()
#             sucursal_ = {
#                 'id':sucursal.id,
#                 'ciudad':sucursal.ciudad,
#                 'direccion':sucursal.direccion,
#                 'telefono':sucursal.telefono,
#                 'nombre_User':User.nombre_completo,
#                 'nombre_jefe_taller':jefe_taller.nombre_completo
#             }
#             lista_sucursales.append(sucursal_)

#         return Response(lista_sucursales)

class SucursalApiView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
    
class VehicleApiView(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
