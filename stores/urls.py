from rest_framework.routers import DefaultRouter
from stores import views as stores_views

router = DefaultRouter()
router.register(r'stores', stores_views.StoreView, basename='stores')

urlpatterns = [
    *router.urls,  # ensures it's a list, avoiding circular reference issues
]
