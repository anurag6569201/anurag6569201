#!/bin/bash
set -o errexit

# Ensure pip is installed
echo "Ensuring pip is installed..."
python3.9 -m ensurepip --upgrade

# Install dependencies
echo "Installing dependencies..."
python3.9 -m pip install --upgrade pip
python3.9 -m pip install -r requirements.txt

# Collect Static
echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear
