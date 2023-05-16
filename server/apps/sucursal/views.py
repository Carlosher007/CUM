from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Sucursal
from .serializer import SucursalSerializer

# Create your views here.
class SucursalAPIView(APIView):

    def get(self, request):
        sucursales = Sucursal.objects.all()
        sucursal_serializer = SucursalSerializer(sucursales, many=True)
        return Response(sucursal_serializer.data)
