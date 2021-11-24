from rest_framework import serializers

from src.restaurants.models import Restaurant, Review

class RestaurantSerializer(serializers.ModelSerializer):
  reviews_count = serializers.IntegerField(read_only = True)
  reviews_avg = serializers.FloatField(read_only = True)
  
  class Meta:
    model = Restaurant
    fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source='author.username')
  class Meta:
    model = Review
    fields = '__all__'