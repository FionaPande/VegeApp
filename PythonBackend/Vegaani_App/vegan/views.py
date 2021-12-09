
from django.shortcuts import render, redirect
from .forms import ProductForm
from .models import Product, Suggestions, Favorites, Category
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from django.core import serializers
from rest_framework.response import Response
import json
from django.http import HttpResponse
from .filters import ProductFilter
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import SuggestionSerializer, FavoritesSerializer
from rest_framework.parsers import JSONParser 
from django.views.decorators.csrf import csrf_protect









# Create your views here.

@login_required
def product_list(request):
    f = ProductFilter(request.GET, queryset=Product.objects.all())
    count = Product.objects.all().count()
    return render(request, 'product_register/product_list.html', {'filter': f, 'count': count})

@login_required
def product_form(request, id=0):
    if request.method == "GET":
        if id == 0:
            form = ProductForm()
        else:
            product = Product.objects.get(pk=id)
            form = ProductForm(instance=product)
        return render(request, "product_register/product_form.html", {'form': form})
    else:
        if id == 0:
            form = ProductForm(request.POST)
        else:
            product = Product.objects.get(pk=id)
            form = ProductForm(request.POST,instance= product)
        if form.is_valid():
            form.save()
        return redirect('/vegan/list')

@user_passes_test(lambda u: u.is_superuser)
def product_delete(request,id):
    product = Product.objects.get(pk=id)
    product.delete()
    return redirect('/vegan/list')

@login_required
def suggestion_list(request):
    context = {'suggestion_list': Suggestions.objects.all()}
    return render(request, "suggestion_register/product_list.html", context)

def JSONProducts(request, pretty=True):
    product_list = Product.objects.all()
    output = serializers.serialize('json', product_list)
    if pretty:
        output = json.dumps(json.loads(output), indent=4)
    return HttpResponse(output, content_type="application/json")

def JSONCategories(request, pretty=True):
    product_list = Category.objects.all()
    output = serializers.serialize('json', product_list)
    if pretty:
        output = json.dumps(json.loads(output), indent=4)
    return HttpResponse(output, content_type="application/json")

def JSONSuggestions(request, pretty=True):
    product_list = Suggestions.objects.all()
    output = serializers.serialize('json', product_list)
    if pretty:
        output = json.dumps(json.loads(output), indent=4)
    return HttpResponse(output, content_type="application/json")

def JSONFavorites(request, pretty=True):
    product_list = Favorites.objects.all()
    output = serializers.serialize('json', product_list)
    if pretty:
        output = json.dumps(json.loads(output), indent=4)
    return HttpResponse(output, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def sugg_list(request):
    if request.method == 'POST':
        sugg_data = JSONParser().parse(request)
        sugg_serializer = SuggestionSerializer(data=sugg_data)
        if sugg_serializer.is_valid():
            sugg_serializer.save()
            
            u = Suggestions(sugg_serializer.data)
            u.save()
            return JsonResponse(sugg_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(sugg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def fav_list(request):
    if request.method == 'POST':
        fav_data = JSONParser().parse(request)
        fav_serializer = FavoritesSerializer(data=fav_data)
        if fav_serializer.is_valid():
            fav_serializer.save()
            
            u = Favorites(fav_serializer.data)
            u.save()
            return JsonResponse(fav_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(fav_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    elif request.method == 'DELETE': 
        Favorites.delete() 
        return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@csrf_protect
@api_view(['GET', 'POST', 'DELETE'])
def favorites_detail(request, pk, authorID):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Favorites.objects.get(pk=pk, authorID = authorID)
    except Favorites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


