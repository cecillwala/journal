from .views import *
from django.urls import path

urlpatterns = [
    path("home", index, name="index"),
    path("entries", entries, name="entries"),
    path("new_entry", new_entry, name="new_entry"),
    path("register", register, name="register"),
    path("login", login, name="login")
]