from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from datetime import datetime, date

def days_difference(day):
    date1 = date(day.year, day.month, day.day)
    date2 = date(datetime.now().year, 1, 1)
    return date1 - date2
# Create your views here.
def index(request):
    return render(request, "thoughts/index.html")

def entries(request):
    entries = [days_difference(entry.serialize()).days for entry in Entries.objects.all()]
    return JsonResponse(entries, safe=False)

