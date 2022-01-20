from .models import Restaurant, Review
from .serializers import RestaurantSerializer, ReviewSerializer, RestaurantWithReviewsSerializer
from rest_framework import generics, filters, permissions
from django.db.models import Avg, Count
from src.restaurants.permissions import AdminOnly
from django_eventstream import send_event


class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filter_backends = [filters.OrderingFilter]
    permission_classes = [AdminOnly]

    def get_queryset(self):
        send_event('test', 'message', {'text': 'hello world'})
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )

class RestaurantWithReviewsDetail(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantWithReviewsSerializer
    permission_classes = [AdminOnly]

    def get_queryset(self):
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )

class RestaurantDetail(generics.RetrieveAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [AdminOnly]

    def get_queryset(self):
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ReviewDetail(generics.RetrieveAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)