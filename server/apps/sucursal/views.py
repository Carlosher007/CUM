from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Sucursal
from .serializer import SucursalSerializer
from apps.usuario.models import Gerente, JefeTaller

# Create your views here.
class SucursalAPIView(APIView):

    def get(self, request):
        gerentes = Gerente.objects.all().select_related('cedula')
        lista_sucursales = []
        for gerente in gerentes: 
            sucursal = gerente.cedula
            jefe_taller = JefeTaller.objects.filter(cedula=sucursal.cedula_jefe_taller).first()
            sucursal_ = {
                'id':sucursal.id,
                'ciudad':sucursal.ciudad,
                'direccion':sucursal.direccion,
                'telefono':sucursal.telefono,
                'nombre_gerente':gerente.nombre_completo,
                'nombre_jefe_taller':jefe_taller.nombre_completo
            }
            lista_sucursales.append(sucursal_)

        return Response(lista_sucursales)
