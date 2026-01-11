#!/usr/bin/env bash
set -o errexit

echo "Running migrations..."
python manage.py migrate

echo "Creating admin user..."
python server/create_admin.py

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting gunicorn..."
gunicorn server.wsgi:application --bind 0.0.0.0:$PORT