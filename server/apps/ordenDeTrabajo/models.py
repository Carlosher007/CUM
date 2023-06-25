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
                                   blank=True,
                                   through='WorkOrderSupplies')
    state = models.CharField(max_length=100, choices=STATE_CHOICES,
                             default='SENT')

    class Meta:
        db_table = 'work_order'

class WorkOrderSupplies(models.Model):
    work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE,
                                   blank=True, null=True)
    part = models.ForeignKey('sucursal.SucursalPart', on_delete=models.CASCADE,
                             blank=True, null=True)
    quantity = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'work_order_supplies'
        unique_together = [['work_order', 'part']]