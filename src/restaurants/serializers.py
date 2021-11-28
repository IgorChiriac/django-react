from rest_framework import serializers

from src.restaurants.models import Restaurant, Review

class ReviewSerializer(serializers.ModelSerializer):
  author = serializers.ReadOnlyField(source='author.username')
  class Meta:
    model = Review
    fields = '__all__'
    extra_kwargs = {'num_stars': {'required': True}} 

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
    current_restaurant_reviews =  Review.objects.filter(restaurant=obj).count()
    if current_restaurant_reviews == 0:
      return ReviewSerializer([], many=True).data
    if current_restaurant_reviews > 2:
      last_review = Review.objects.filter(restaurant=obj).last()
      ordered_reviews = Review.objects.filter(restaurant=obj).order_by('-num_stars')
      return  ReviewSerializer([last_review, ordered_reviews.first(), ordered_reviews.last()], many=True).data
    else:
      reviews_queryset = Review.objects.filter(restaurant=obj).last()
      return  ReviewSerializer([reviews_queryset], many=True).data