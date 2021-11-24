from .models import Restaurant, Review
from .serializers import RestaurantSerializer, ReviewSerializer
from rest_framework import generics
from django.db.models import Avg, Count
from rest_framework import filters
from src.restaurants.permissions import AdminOnly
from rest_framework.permissions import IsAuthenticated


class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filter_backends = [filters.OrderingFilter]
    permission_classes = [IsAuthenticated, AdminOnly]

    def get_queryset(self):
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated, AdminOnly]

    def get_queryset(self):
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, AdminOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)