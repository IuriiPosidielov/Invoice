from django.contrib import admin
from .models import SalesInvoice, RevenueInvoice, InvoicePosition

# Register your models here.
admin.site.register(SalesInvoice)
admin.site.register(RevenueInvoice)
admin.site.register(InvoicePosition)
