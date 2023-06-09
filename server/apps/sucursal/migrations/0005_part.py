# Generated by Django 4.2.1 on 2023-06-13 01:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sucursal', '0004_alter_vehiclesucursal_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sucursal.vehicle')),
            ],
            options={
                'db_table': 'part',
                'unique_together': {('name', 'vehicle')},
            },
        ),
    ]
