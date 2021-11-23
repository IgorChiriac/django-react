from rest_framework import serializers

from src.restaurants.models import Restaurant, Review
from src.common.serializers import ThumbnailerJSONSerializer

class RestaurantSerializer(serializers.ModelSerializer):
  reviews_count = serializers.IntegerField()
  reviews_avg = serializers.FloatField()
  
  class Meta:
    model = Restaurant
    fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = Review
    fields = '__all__'