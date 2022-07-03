from django.urls import path
from . import views

urlpatterns = [
    path('of_user', views.get_user_tasks),
    path('create', views.create_task),
    path('change_or_delete/<int:id>', views.change_vs_delete_task)
]
