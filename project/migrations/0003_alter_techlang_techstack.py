# Generated by Django 5.0 on 2024-03-11 15:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_techstack_techlang'),
    ]

    operations = [
        migrations.AlterField(
            model_name='techlang',
            name='techstack',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='techlang', to='project.techstack'),
        ),
    ]
