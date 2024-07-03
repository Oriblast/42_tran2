from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django_otp.decorators import otp_required
from django.conf import settings

@login_required
@otp_required
def home(request):
    return render(request, 'auth_app/home.html')

def login_view(request):
    return render(request, 'auth_app/login.html')

def otp_setup(request):
    # Logique pour configurer l'OTP
    return render(request, 'auth_app/otp_setup.html')
