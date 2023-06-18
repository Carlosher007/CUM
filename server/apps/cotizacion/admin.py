from django.contrib import admin
from .models import Quotation, AssignedQuote

# Register your models here.
admin.site.register(Quotation)
admin.site.register(AssignedQuote)