from django import forms
from .models import Product


class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ('title','brand', 'position', 'description', 'stores', 'suggestionID', 'image', 'suggestionID_2', 'suggestionID_3', 'reference' )
      

    def __init__(self, *args, **kwargs):
        super(ProductForm,self).__init__(*args, **kwargs)
        self.fields['position'].empty_label = "Select"
        self.fields['suggestionID'].required = False
