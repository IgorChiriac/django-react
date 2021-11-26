from rest_framework import serializers

from src.restaurants.models import Restaurant, Review

class ReviewSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source='author.username')
  class Meta:
    model = Review
    fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
  reviews_count = serializers.IntegerField(read_only = True)
  reviews_avg = serializers.FloatField(read_only = True)
  class Meta:
    model = Restaurant
    fields = '__all__'


class RestaurantWithReviewsSerializer(serializers.ModelSerializer):
  reviews_count = serializers.IntegerField(read_only = True)
  reviews_avg = serializers.FloatField(read_only = True)
  reviews_summary = serializers.SerializerMethodField()
  
  class Meta:
    model = Restaurant
    fields = '__all__'

  def get_reviews_summary(self, obj):
    reviews_queryset = Review.objects.filter(restaurant=obj)[:3]
    return  ReviewSerializer(reviews_queryset, many=True).data