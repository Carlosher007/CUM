# Generated by Django 4.2.1 on 2023-05-20 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0002_alter_usuario_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]