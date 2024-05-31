#!/bin/bash
set -o errexit

# Ensure pip is installed
echo "Ensuring pip is installed..."
python3.10 -m ensurepip --upgrade

# Install dependencies
echo "Installing dependencies..."
python3.10 -m pip install --upgrade pip
python3.10 -m pip install -r requirements.txt

# Make Migrations
echo "Make Migration..."
python3.10 manage.py makemigrations --noinput
python3.10 manage.py migrate --noinput

# Collect Static
echo "Collect Static..."
python3.10 manage.py collectstatic --noinput --clear
