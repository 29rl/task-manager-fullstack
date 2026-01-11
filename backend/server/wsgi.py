import os
from django.core.wsgi import get_wsgi_application
import server.create_admin


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
application = get_wsgi_application()
