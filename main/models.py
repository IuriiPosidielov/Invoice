from django.db import models

# Create your models here.

class RevenueInvoice(models.Model):
	Nr = models.TextField(null=True,blank=True)
	Buyer = models.TextField(null=True,blank=True)
	IssueDate = models.TextField(null=True,blank=True)
	SaleDate = models.TextField(null=True,blank=True)
	PaymentMethod = models.TextField(null=True,blank=True)
	Description = models.TextField(null=True,blank=True)
	Currency = models.TextField(null=True,blank=True)
	CurrencyRate = models.TextField(null=True,blank=True)
	InvoicePosition = models.IntegerField()

	def __str__(self):
		return self.Nr

class SalesInvoice(models.Model):
	Nr = models.TextField(null=True,blank=True)
	Seller = models.TextField(null=True,blank=True)
	IssueDate = models.TextField(null=True,blank=True)
	SaleDate = models.TextField(null=True,blank=True)
	PaymentMethod = models.TextField(null=True,blank=True)
	Description = models.TextField(null=True,blank=True)
	Currency = models.TextField(null=True,blank=True)
	CurrencyRate = models.TextField(null=True,blank=True)
	InvoicePosition = models.IntegerField()

	def __str__(self):
		return self.Nr


class InvoicePosition(models.Model):
	Nr = models.TextField(null=True,blank=True)
	Name = models.TextField(null=True,blank=True)
	PKWiU = models.TextField(null=True,blank=True)
	Unit = models.TextField(null=True,blank=True)
	Quantity = models.TextField(null=True,blank=True)
	Price = models.TextField(null=True,blank=True)
	Tax = models.TextField(null=True,blank=True)
	GTU = models.TextField(null=True,blank=True)
	

	def __str__(self):
		return self.Nr
