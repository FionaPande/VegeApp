from rest_framework import serializers
from .models import Suggestions, Favorites

class SuggestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Suggestions
        fields= ('id',
             'title',
             'brand',
             'description',
             'authorID'       )

class FavoritesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorites
        fields= ('id',
             'title',
             'brand',
             'authorID',
             'photo'       )