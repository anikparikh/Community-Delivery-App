# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StoreView, WishlistView

router = DefaultRouter()
router.register(r'stores', StoreView, basename='stores')
router.register(r'wishlists', WishlistView, basename='wishlists')

urlpatterns = [
    path('', include(router.urls)),
]
