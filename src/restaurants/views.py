from .models import Restaurant
from .serializers import RestaurantSerializer
from rest_framework import generics
from django.db.models import Avg, Count
from rest_framework import filters


class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        return Restaurant.objects.annotate(
            reviews_count=Count('reviews'),
            reviews_avg=Avg('reviews__num_stars')
        )


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer