# Generated by Django 4.2.1 on 2023-06-12 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sucursal', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='brakes',
            field=models.CharField(choices=[('D4x4', 'Frenos de Disco en las Cuatro Ruedas'), ('D4x2', 'Frenos de Tambor en las Ruedas Traseras'), ('EBA', 'Emergency Brake Assist'), ('ABS', 'Antiblockiersystem')], max_length=100),
        ),
    ]
