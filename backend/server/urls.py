from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def home(request):
    return JsonResponse(
        {
            "status": "OK",
            "service": "Task Manager API",
            "message": "Backend is running successfully",
        }
    )


urlpatterns = [
    path("", home),  # ← endpoint root pentru Render & browser
    path("admin/", admin.site.urls),
    # JWT
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # App
    path("api/", include("tasks.urls")),
]
