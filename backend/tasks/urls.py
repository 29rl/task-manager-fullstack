from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from .auth_views import RegisterView, UserDetailView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/me/', UserDetailView.as_view(), name='user_detail'),
]
