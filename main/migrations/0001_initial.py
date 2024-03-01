# Generated by Django 4.2.1 on 2024-02-12 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InvoicePosition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nr', models.TextField(blank=True, null=True)),
                ('Name', models.TextField(blank=True, null=True)),
                ('PKWiU', models.TextField(blank=True, null=True)),
                ('Unit', models.TextField(blank=True, null=True)),
                ('Quantity', models.TextField(blank=True, null=True)),
                ('Price', models.TextField(blank=True, null=True)),
                ('Tax', models.TextField(blank=True, null=True)),
                ('GTU', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='RevenueInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nr', models.TextField(blank=True, null=True)),
                ('Buyer', models.TextField(blank=True, null=True)),
                ('IssueDate', models.TextField(blank=True, null=True)),
                ('SaleDate', models.TextField(blank=True, null=True)),
                ('PaymentMethod', models.TextField(blank=True, null=True)),
                ('Description', models.TextField(blank=True, null=True)),
                ('Currency', models.TextField(blank=True, null=True)),
                ('CurrencyRate', models.TextField(blank=True, null=True)),
                ('InvoicePosition', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SalesInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nr', models.TextField(blank=True, null=True)),
                ('Seller', models.TextField(blank=True, null=True)),
                ('IssueDate', models.TextField(blank=True, null=True)),
                ('SaleDate', models.TextField(blank=True, null=True)),
                ('PaymentMethod', models.TextField(blank=True, null=True)),
                ('Description', models.TextField(blank=True, null=True)),
                ('Currency', models.TextField(blank=True, null=True)),
                ('CurrencyRate', models.TextField(blank=True, null=True)),
                ('InvoicePosition', models.IntegerField()),
            ],
        ),
    ]
