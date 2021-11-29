release: python manage.py migrate

web: newrelic-admin run-program gunicorn src.wsgi

worker: python manage.py rqworker default