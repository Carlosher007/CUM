# Generated by Django 4.2.1 on 2023-06-17 22:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cotizacion', '0002_alter_quotation_table'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Quotation',
        ),
    ]
