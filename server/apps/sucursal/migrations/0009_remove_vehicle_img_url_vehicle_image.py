# Generated by Django 4.2.1 on 2023-06-18 22:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('sucursal', '0008_alter_sucursalpart_part'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehicle',
            name='image',
        ),
        migrations.AddField(
            model_name='vehicle',
            name='image',
            field=models.FileField(default=django.utils.timezone.now, upload_to='cum_vehicles'),
            preserve_default=False,
        ),
    ]
