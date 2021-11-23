# Generated by Django 3.2.4 on 2021-11-23 16:25

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0002_auto_20211123_1529'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='num_stars',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)]),
        ),
        migrations.AlterField(
            model_name='review',
            name='visit_date',
            field=models.DateField(validators=[django.core.validators.MaxValueValidator(limit_value=datetime.date.today)]),
        ),
    ]
