from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from ..models import Cliente
from .serializers import ClienteSerializer, RegistroSerializer, UsuarioTokenSerializer

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
    
class LoginView(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        login_serializer = self.serializer_class(data=request.data, context={'request':request})
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                usuario_token_serializer = UsuarioTokenSerializer(user)
                if created:
                    return Response({
                        'token':token.key,
                        'usuario':usuario_token_serializer.data, 
                        'mensaje':'Inicio de sesion exitoso'
                    }, status=status.HTTP_201_CREATED)
                else:
                    token.delete()
                    return Response({
                        'error':'Ya ha inciado sesion con este usuario'
                    }, status=status.HTTP_409_CONFLICT)
            else:
                return Response({'error':'Este usuario no puede iniciar sesion'},
                                status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error':'Nombre de usuario o contraseña incorrectos'},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'Response'}, status=status.HTTP_200_OK)
