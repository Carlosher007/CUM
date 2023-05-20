# Generated by Django 4.2.1 on 2023-05-17 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sucursal',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cedula_gerente', models.CharField(max_length=10, unique=True)),
                ('cedula_jefe_taller', models.CharField(max_length=10, unique=True)),
                ('ciudad', models.CharField(max_length=40)),
                ('direccion', models.CharField(max_length=100)),
                ('telefono', models.CharField(max_length=13)),
            ],
            options={
                'db_table': 'sucursal',
            },
        ),
    ]