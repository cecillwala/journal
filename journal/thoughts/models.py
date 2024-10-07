from django.db import models

# Create your models here.

class Entries(models.Model):
    date = models.DateField(auto_now=True)
    entry = models.TextField(null=True)

    def serialize(self):
        return self.date
