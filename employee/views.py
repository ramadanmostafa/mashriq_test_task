from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.base import View
from django.views.generic.edit import FormView, DeleteView

from employee.forms import EmployeeForm
from .models import Employee


class ListEmployees(View):
    def get(self, request):
        context = {
            'employees': Employee.objects.all()
        }
        return render(request, 'employee/list.html', context=context)


class AddEmployee(FormView):
    template_name = 'employee/add.html'
    form_class = EmployeeForm
    success_url = reverse_lazy('list')

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.save(commit=True)
        return super().form_valid(form)


class UpdateEmployee(FormView):
    template_name = 'employee/update.html'
    form_class = EmployeeForm
    success_url = reverse_lazy('list')
    model = Employee
    initial = ''

    def get_initial(self, *args, **kwargs):
        return Employee.objects.get(pk=self.kwargs['pk']).to_dict()

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        emp = Employee.objects.get(pk=self.kwargs['pk'])
        emp.update_from_post(form.cleaned_data)
        return HttpResponseRedirect(self.get_success_url())


class DeleteEmployee(DeleteView):
    model = Employee
    success_url = reverse_lazy('list')
    template_name = 'employee/delete.html'
