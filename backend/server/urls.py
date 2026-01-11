from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Task Manager API",
        "endpoints": {
            "tasks": "/api/tasks/",
            "auth_register": "/api/auth/register/",
            "auth_login": "/api/token/",
            "auth_refresh": "/api/token/refresh/",
            "auth_me": "/api/auth/me/",
        }
    })

urlpatterns = [
    path("", api_root, name="api_root"),
    path("admin/", admin.site.urls),
    path("api/", include("tasks.urls")),
]