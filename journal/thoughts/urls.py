from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("entries", views.entries, name="entries"),
    path("new_entry", views.new_entry, name="new_entry"),
    path("register", views.register_view, name="register"),
    path("login", views.login_view, name="login")
]