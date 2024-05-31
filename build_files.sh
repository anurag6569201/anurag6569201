set -o errexit

# Build the project
echo "Building the project..."
python3.9 -m pip3 install -r requirements.txt
python3.9 -m pip3 install django==5.0

echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear