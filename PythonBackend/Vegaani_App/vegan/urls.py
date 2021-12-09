from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.product_form,name='product_insert'), # get and post req. for insert operation
    path('<int:id>/', views.product_form,name='product_update'), # get and post req. for update operation
    path('delete/<int:id>/',views.product_delete,name='product_delete'),
    path('list/',views.product_list,name='product_list'), # get req. to retrieve and display all records
    path('sugglist/',views.suggestion_list,name='suggestion_list'), # get req. to retrieve and display all records
    path('products/',views.JSONProducts, name='JSONPRODUCTS'),
    path('suggestions/',views.JSONSuggestions, name='JSONSuggestions'),
    path('categories/',views.JSONCategories, name='JSONCategories'),
    path('favorites/',views.JSONFavorites, name='JSONFavorites'),
    path('addsuggs', views.sugg_list, name='sugg_list'),
    path('addfavs', views.fav_list, name='fav_list'),
    path('favorites_delete/<int:pk>&<authorID>', views.favorites_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
