from django.urls import path

from .views import ListEmployees, AddEmployee, UpdateEmployee, DeleteEmployee

urlpatterns = [
    path('', ListEmployees.as_view(), name='list'),
    path('add/', AddEmployee.as_view(), name='add'),
    path('update/<int:pk>/', UpdateEmployee.as_view(), name='update'),
    path('delete/<int:pk>/', DeleteEmployee.as_view(), name='delete'),
]
