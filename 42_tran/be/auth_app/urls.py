from django.urls import path
from .views import home, login_view, otp_setup

urlpatterns = [
    path('', home, name='home'),
    path('login/', login_view, name='login'),
    path('otp-setup/', otp_setup, name='otp_setup'),
]
