# build_files.sh
which python3.9
pwd
cd /usr/local/bin/
yum install sqlite-devel -y
./configure --enable-optimizations --enable-loadable-sqlite-extensions
make && make altinstall
cd /vercel/path0/
pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput