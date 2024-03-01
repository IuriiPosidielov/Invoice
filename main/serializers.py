from rest_framework import serializers
from .models import RevenueInvoice

class RevenueInvoiceSerializer(serializers.ModelSerializer):
	class Meta:
		model = RevenueInvoice
		fields = ['id', 'Nr', 'Buyer', 'IssueDate', 'SaleDate', 'PaymentMethod', 'Description', 'Currency', 'CurrencyRate', 'InvoicePosition']
