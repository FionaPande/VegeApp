
from django.db import models

# Create your models here.

class Category(models.Model):
    catID = models.CharField(max_length=50)


    def __str__(self):
        return self.catID

class Product(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    image =models.ImageField(upload_to='media/', blank=True)
    stores = models.CharField(max_length=100)
    suggestionID = models.CharField(max_length=100, default=0)
    suggestionID_2 = models.CharField(max_length=100,default=0)
    suggestionID_3 = models.CharField(max_length=100, default=0)
    reference =  models.CharField(max_length=100, default=0)
    position= models.ForeignKey(Category,on_delete=models.CASCADE)

class Suggestions(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    authorID = models.CharField(max_length=100, default=0)


class Favorites(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    authorID = models.CharField(max_length=100)
    photo = models.CharField(max_length=100)

