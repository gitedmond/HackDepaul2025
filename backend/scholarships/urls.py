from django.urls import path
from . import views

urlpatterns = [
    path('scholarships/', views.scholarship_list, name='scholarship-list'),
]