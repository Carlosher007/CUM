# Generated by Django 4.2.1 on 2023-06-12 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sucursal', '0002_alter_vehicle_brakes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehiclesucursal',
            name='color',
            field=models.CharField(choices=[('#FF0000', 'Rojo'), ('#0000FF', 'Azul'), ('#BF930D', 'Amarillo'), ('#000000', 'Negro'), ('#AAADAC', 'Gris')], max_length=100),
        ),
    ]