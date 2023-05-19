from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cliente
from .serializers import ClienteSerializer

# Create your views here.
class ClienteAPIView(APIView):

    def get(self, request):
        clientes = Cliente.objects.all()
        clientes_serializer = ClienteSerializer(clientes, many=True)
        return Response(clientes_serializer.data)
    
    def post(self, request):
        cliente_serializer = ClienteSerializer(data=request.data)
        if cliente_serializer.is_valid():
            cliente_serializer.save()
            return Response(cliente_serializer.data)
        return Response(cliente_serializer.errors)
