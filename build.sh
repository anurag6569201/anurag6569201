set -o errexit

# Build the project
echo "Building the project..."
python3.9 -m pip install -r requirements.txt
python3.9 -m pip install django==4.2.9

echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear