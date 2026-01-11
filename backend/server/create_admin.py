import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com")
PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin12345")

if not User.objects.filter(username=USERNAME).exists():
    User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
    print("Superuser created")
else:
    print("Superuser already exists")
