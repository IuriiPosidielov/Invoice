from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, schema
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
	return render(request, 'main/index.html')

# Create your views here.
@api_view(['GET','POST'])
@permission_classes([permissions.IsAuthenticated,])
def invoices_list(request):
	if request.method == "GET":
		print("get")
		data = RevenueInvoice.objects.all()
		serializer = RevenueInvoiceSerializer(data, context={'request': request}, many=True)
		return Response(serializer.data)
	elif request.method == "POST":
		print("post")
		serializer = RevenueInvoiceSerializer(data=request.data)
		print(serializer)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT","DELETE"])
@permission_classes([permissions.IsAuthenticated,])
def invoices_details(request, pk):
	try:
		invoice = RevenueInvoice.objects.get(pk=pk)
	except RevenueInvoice.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)
	if request.method == 'PUT':
		serializer = RevenueInvoiceSerializer(invoice, data=request.data, context={'request': request})
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'DELETE':
		invoice.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

