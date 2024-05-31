set -o errexit

# Build the project
echo "Building the project..."
pip install -r requirements.txt
pip install django==5.0

echo "Make Migration..."
manage.py makemigrations --noinput
manage.py migrate --noinput

echo "Collect Static..."
manage.py collectstatic --noinput --clear