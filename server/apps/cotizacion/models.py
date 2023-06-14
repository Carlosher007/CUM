from django.db import models

class QuotationRequest(models.Model):
    cliente = models.ForeignKey('usuario.User', 
                             on_delete=models.CASCADE)
    vehicle_sucursal = models.ForeignKey('sucursal.VehicleSucursal',
                                         on_delete=models.CASCADE)
    assigned = models.BooleanField(default=False)

    class Meta:
        db_table = 'quotation_request'

class AssignedQuotationRequest(models.Model):
    quotation_request = models.OneToOneField(QuotationRequest,
                                             on_delete=models.CASCADE,
                                             primary_key=True)
    vendedor = models.ForeignKey('usuario.User',
                                 on_delete=models.CASCADE)
    finished = models.BooleanField(default=False)

    class Meta:
        db_table = 'assigned_quotation_request'

class Quotation(models.Model):
    assigned_quotation_request = models.ForeignKey(AssignedQuotationRequest,
                                                   on_delete=models.CASCADE)
    num_installments = models.PositiveSmallIntegerField()
    initial_fee = models.PositiveIntegerField()
    quota_value = models.PositiveIntegerField()
    accepted = models.BooleanField(null=True, blank=True)

    class Meta:
        db_table = 'quotation'