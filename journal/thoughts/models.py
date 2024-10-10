from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Entries(models.Model):
    date = models.DateField(auto_now=True)
    entry = models.TextField(null=True)
    day = models.IntegerField(null=True)

    def serialize(self):
        return self.date
    

class User(AbstractUser):
    pass