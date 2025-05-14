from wishlists import views as wishlists_views

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from stores import views as stores_views
from home import views as home_views

router = DefaultRouter()
router.register(r'stores', stores_views.StoreView, basename='stores')
router.register(r'home', home_views.HomePage, basename='home')
router.register(r'wishlists', wishlists_views.WishlistView, basename='wishlists')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),  # includes both stores/ and home/
]
