release: python manage.py migrate

web: gunicorn src.wsgi --log-file -

worker: python manage.py rqworker default