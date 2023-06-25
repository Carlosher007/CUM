from django.db import models

# Create your models here.
class WorkOrder(models.Model):
    STATE_CHOICES = (
        ("SENT", "SENT"),
        ("CANCELLED", "CANCELLED"),
        ("FINISHED", "FINISHED"),
    )   

    client_vehicle = models.ForeignKey('cotizacion.AssignedQuote',
                                       on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    parts = models.ManyToManyField('sucursal.SucursalPart',
                                   blank=True)
    state = models.CharField(max_length=100, choices=STATE_CHOICES,
                             default='SENT')
    total_price = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'work_order'