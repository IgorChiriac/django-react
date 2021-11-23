from django.contrib import admin

from src.restaurants.models import Restaurant, Review

admin.site.register(Restaurant)
admin.site.register(Review)
