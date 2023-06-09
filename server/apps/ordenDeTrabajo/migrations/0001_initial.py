# Generated by Django 4.2.1 on 2023-06-25 02:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sucursal', '0009_remove_vehicle_img_url_vehicle_image'),
        ('cotizacion', '0007_alter_assignedquote_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('state', models.CharField(choices=[('SENT', 'SENT'), ('CANCELLED', 'CANCELLED'), ('FINISHED', 'FINISHED')], default='SENT', max_length=100)),
                ('client_vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cotizacion.assignedquote')),
                ('parts', models.ManyToManyField(blank=True, to='sucursal.sucursalpart')),
            ],
            options={
                'db_table': 'work_order',
            },
        ),
    ]
