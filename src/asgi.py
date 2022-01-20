"""
ASGI entrypoint. Configures Django and then runs the application
defined in the ASGI_APPLICATION setting.
"""

import os
import django
from django.core.asgi import get_asgi_application
from django.conf.urls import url
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import django_eventstream
from django_eventstream import send_event

import threading

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.config.local")

application = ProtocolTypeRouter({
    'http': URLRouter([
        url(r'^events/', AuthMiddlewareStack(
            URLRouter(django_eventstream.routing.urlpatterns)
        ), { 'channels': ['test'] }),
        url(r'', get_asgi_application()),
    ]),
})

def printit():
  threading.Timer(5.0, printit).start()
  print('sent event')
  send_event('test', 'message', {'text': 'hello world'})

printit()