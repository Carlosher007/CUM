# Generated by Django 4.2.1 on 2023-06-18 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cotizacion', '0006_alter_quotation_table_assignedquote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignedquote',
            name='state',
            field=models.CharField(choices=[('IN_PROGRESS', 'IN_PROGRESS'), ('CANCELLED', 'CANCELLED'), ('ACCEPTED', 'ACCEPTED'), ('FINISHED', 'FINISHED')], default='IN_PROGRESS', max_length=100),
        ),
    ]