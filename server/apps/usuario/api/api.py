from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from ..models import User
from .serializers import ValidateUserSerializer, UserSerializer, UserVerificationCodeSerializer
from ..views import generate_verification_code

# class UserAPIView(APIView):

#     def get(self, request):
#         users =User.objects.all()
#         user_serializer = UserSerializer(users, many=True)
#         return Response(user_serializer.data)
    
#     def post(self, request):
#         user_serializer = UserSerializer(data=request.data)
#         if user_serializer.is_valid():
#             user_serializer.save()
#             return Response(user_serializer.data)
#         return Response(user_serializer.errors)

class UserAPIView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class LoginView(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        login_serializer = self.serializer_class(data=request.data, context={'request':request})
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = UserSerializer(user)
                if not created:
                    return Response({
                        'token':token.key,
                        'usuario':user_serializer.data, 
                        'mensaje':'Inicio de sesion exitoso'
                    }, status=status.HTTP_201_CREATED)
                else:
                    token.delete()
                    return Response({
                        'error':'No se ha validado el usuario antes'
                    }, status=status.HTTP_409_CONFLICT)
            else:
                return Response({'error':'Este usuario no puede iniciar sesion'},
                                status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error':'Nombre de usuario o contraseña incorrectos'},
                            status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationCodeView(APIView):

    def get(self, request):
        user_verification_code_serializer = UserVerificationCodeSerializer(data=request.data)
        if user_verification_code_serializer.is_valid():
            email = user_verification_code_serializer.validated_data['email']
            code = generate_verification_code()
            try:
                send_mail(
                    'Código de verificación',
                    f'Tu código de verificación es: {code}',
                    'settings.EMAIL_HOST_USER',
                    [email],
                    fail_silently=False,
                )
                return Response({
                    'message':'Codigo de verificacion enviado con exito',
                    'code':code,
                    'email':email
                }, status=status.HTTP_200_OK)
            except:
                return Response({'error':'No se logro enviar el email'},
                               status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Email invalido'},
                            status=status.HTTP_400_BAD_REQUEST)
        
class ValidateUserView(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        login_serializer = self.serializer_class(data=request.data, context={'request':request})
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_token_serializer = ValidateUserSerializer(user)
                if created:
                    return Response({
                        'user':user_token_serializer.data, 
                        'message':'Usuario valido'
                    }, status=status.HTTP_202_ACCEPTED)
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
