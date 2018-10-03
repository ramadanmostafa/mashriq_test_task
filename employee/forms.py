from django.forms import ModelForm, DateTimeInput

from .models import Employee


class EmployeeForm(ModelForm):
    class Meta:
        model = Employee
        fields = "__all__"
        widgets = {
            'date_of_birth': DateTimeInput(attrs={'class': 'datepicker'}),
        }
