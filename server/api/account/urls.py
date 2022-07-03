from django.urls import path, include
from . import views
from knox import views as knox_views


urlpatterns = [
    path('', include('knox.urls')),
    path('user', views.UserAPI.as_view()),
    path('signup', views.RegisterAPI.as_view()),
    path('signin', views.LoginAPI.as_view()),
    path('signout', knox_views.LogoutView.as_view(),
         name='knox_logout')
]
