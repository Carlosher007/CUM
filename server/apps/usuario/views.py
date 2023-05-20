from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cliente
from .serializers import ClienteSerializer, RegistroSerializer

# Registrar usuario
def registro(user, rol):
    data_ = {
        'username':user['cedula'],
        'email':user['email'],
        'password':user['password'],
        'rol':rol
    }
    registro_serializer = RegistroSerializer(data=data_)
    if registro_serializer.is_valid():
        registro_serializer.save()
        return True
    else:
        return False

# Create your views here.
class ClienteAPIView(APIView):

    def get(self, request):
        clientes = Cliente.objects.all()
        clientes_serializer = ClienteSerializer(clientes, many=True)
        return Response(clientes_serializer.data)
    
    def post(self, request):
        cliente_serializer = ClienteSerializer(data=request.data)
        if cliente_serializer.is_valid():
            if registro(request.data, 'Cliente'):
                cliente_serializer.save()
                return Response(cliente_serializer.data)
            return Response({'response':'No se ha podido agregar el usuario'})
        return Response(cliente_serializer.errors)
