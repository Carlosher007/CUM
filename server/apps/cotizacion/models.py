from django.db import models

class Quotation(models.Model):
    vehicle_sucursal = models.ForeignKey('sucursal.VehicleSucursal',
                                         on_delete=models.CASCADE)
    client = models.ForeignKey('usuario.User',
                               on_delete=models.CASCADE)
    num_installments = models.PositiveSmallIntegerField()
    initial_fee = models.PositiveIntegerField()
    quota_value = models.PositiveIntegerField()

    class Meta:
        db_table = 'quotation'

class AssignedQuote(models.Model):
    STATE_CHOICES = (
        ("IN_PROGRESS", "IN_PROGRESS"),
        ("CANCELLED", "CANCELLED"),
        ("ACCEPTED", "ACCEPTED"),
        ("FINISHED", "FINISHED"),
    )

    quotation = models.OneToOneField(Quotation,
                                     on_delete=models.CASCADE,
                                     primary_key=True)
    seller = models.ForeignKey('usuario.User', on_delete=models.CASCADE)
    state = models.CharField(max_length=100, choices=STATE_CHOICES)

    class Meta:
        db_table = 'assigned_quote'