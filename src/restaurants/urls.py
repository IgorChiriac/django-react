from rest_framework.routers import SimpleRouter
from django.urls import path

from .views import RestaurantList, RestaurantDetail, ReviewList, RestaurantWithReviewsDetail

router = SimpleRouter()

urlpatterns = [
    path('', RestaurantList.as_view()),
    path('<int:pk>/', RestaurantDetail.as_view()),
    path('<int:pk>/details', RestaurantWithReviewsDetail.as_view()),
    path('<int:pk>/reviews', ReviewList.as_view()),
]

urlpatterns += router.urls