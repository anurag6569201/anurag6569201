#!/bin/bash
set -o errexit

# Ensure pip is installed
echo "Ensuring pip is installed..."
python3.9 -m ensurepip --upgrade

# Install dependencies
echo "Installing dependencies..."
python3.9 -m pip install --upgrade pip
python3.9 -m pip install -r requirements.txt

# Make Migrations
echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

# Collect Static
echo "Collect Static..."
python3.9 manage.py collectstatic --ignore=vendor/bootswatch/default/bootstrap.min.css.map --noinput --clear
