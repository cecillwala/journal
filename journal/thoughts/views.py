from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse, HttpResponseRedirect
from django.db import IntegrityError
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import *
from datetime import datetime, date
import json

def days_difference(day):
    date1 = date(day.year, day.month, day.day)
    date2 = date(datetime.now().year, 1, 1)
    return date1 - date2


# Create your views here.
@login_required(login_url="login")
def index(request):
    return render(request, "thoughts/index.html")


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if data["password"] != data["confirmation"]:
            return JsonResponse(305, safe=False)
        try:
            user = User(username=data["username"], password=data["password"])
            user.save()
        except IntegrityError:
            return JsonResponse(302, safe=False)
        auth = authenticate(request, username=data["username"], password=data["password"])
        if auth is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
    return render(request, "thoughts/register.html")


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            obj = User.objects.get(username=data["username"])
        except User.DoesNotExist:
            return JsonResponse(410, safe=False)
        user = authenticate(request, username=data["username"], password=data["password"])
        if user is not None:
            login(request, user)
            return JsonResponse(200, safe=False)
        else:
            return JsonResponse(411, safe=False)
    logout(request)
    return render(request, "thoughts/login.html")


@login_required(login_url="login")
def entries(request):
    entries = [days_difference(entry.serialize()).days for entry in Entries.objects.all()]
    return JsonResponse(entries, safe=False)


@login_required(login_url="login")
@csrf_exempt
def new_entry(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        return JsonResponse({"status": 200})
