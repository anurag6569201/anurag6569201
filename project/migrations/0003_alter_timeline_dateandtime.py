# Generated by Django 5.0 on 2024-03-11 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_areainterest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeline',
            name='dateAndTime',
            field=models.DateTimeField(),
        ),
    ]
