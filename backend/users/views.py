from rest_framework.response import Response
from rest_framework import status

from .models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class Logout(APIView):
    """
    clear refresh token from JWT and move it to blacklist

    """
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"Logout Success"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response({"Logout Failed"}, status=status.HTTP_400_BAD_REQUEST)
