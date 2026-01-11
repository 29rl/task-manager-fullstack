#!/usr/bin/env bash
set -o errexit

echo "Running migrations..."
python backend/manage.py migrate

echo "Creating admin if not exists..."
python backend/create_admin.py

echo "Collecting static..."
python backend/manage.py collectstatic --noinput

echo "Starting gunicorn..."
gunicorn server.wsgi:application
