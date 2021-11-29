from rest_framework.routers import SimpleRouter
from django.urls import path

from .views import RestaurantList, RestaurantDetail, ReviewList, RestaurantWithReviewsDetail, ReviewDetail

router = SimpleRouter()

urlpatterns = [
    path('restaurants/', RestaurantList.as_view()),
    path('restaurants/<int:pk>/details/', RestaurantWithReviewsDetail.as_view()),
    path('restaurants/<int:pk>/', RestaurantDetail.as_view()),
    path('reviews/', ReviewList.as_view()),
    path('reviews/<int:pk>/', ReviewDetail.as_view()),
]

urlpatterns += router.urls