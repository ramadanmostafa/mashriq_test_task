from django.db import models
from django.urls import reverse

from employee import GENDER


class Employee(models.Model):

    full_name = models.CharField(max_length=512)
    country = models.CharField(max_length=512, null=True, blank=True)
    nationality = models.CharField(max_length=512, null=True, blank=True)
    date_of_birth = models.DateTimeField()
    place_of_birth = models.CharField(max_length=512, null=True, blank=True)
    marital_status = models.CharField(max_length=512, null=True, blank=True)
    gender = models.CharField(max_length=512, null=True, blank=True, choices=GENDER)
    created = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return reverse('update', kwargs={'pk': self.pk})

    def to_dict(self):
        return {
            "full_name": self.full_name,
            "country": self.country,
            "nationality": self.nationality,
            "date_of_birth": self.date_of_birth,
            "place_of_birth": self.place_of_birth,
            "marital_status": self.marital_status,
            "gender": self.gender,
            "created": self.created,
        }

    def update_from_post(self, data):
        self.full_name = data['full_name']
        self.save()


class Job(models.Model):
    employee = models.ForeignKey(Employee, related_name='jobs', on_delete=models.CASCADE)
    name = models.CharField(max_length=512)
    description = models.TextField(default='')

