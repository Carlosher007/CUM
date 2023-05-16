# Generated by Django 4.2.1 on 2023-05-16 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sucursal', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('cedula', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('celular', models.CharField(max_length=10)),
                ('nombre_completo', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('direccion', models.CharField(max_length=100)),
                ('contraseña', models.CharField(max_length=50)),
                ('sucursal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sucursal.sucursal')),
            ],
            options={
                'db_table': 'cliente',
            },
        ),
    ]
