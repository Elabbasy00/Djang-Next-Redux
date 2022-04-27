from django.urls import path, include
from .views import Logout

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('logout/', Logout.as_view())
]
