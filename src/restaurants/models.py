from django.db import models
from easy_thumbnails.fields import ThumbnailerImageField
from easy_thumbnails.signals import saved_file
from easy_thumbnails.signal_handlers import generate_aliases_global
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import date

class Restaurant(models.Model):
    name = models.CharField(max_length=30)
    cuisine_type = models.CharField(max_length=30)
    restaurant_photo = ThumbnailerImageField('RestaurantPhoto', upload_to='restaurant_photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
  
    def __str__(self):
        return self.name

class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='reviews',on_delete=models.CASCADE)
    author = models.ForeignKey('users.User', on_delete=models.CASCADE)
    comment = models.CharField(max_length=150)
    num_stars = models.FloatField(validators = [MinValueValidator(0.0), MaxValueValidator(5.0)])
    visit_date = models.DateField(validators=[MaxValueValidator(limit_value=date.today)])
    created_at = models.DateTimeField(auto_now_add=True)

saved_file.connect(generate_aliases_global)