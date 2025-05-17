# views.py
from .services import get_nearby_stores_within

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Store
from .serializers import NearbyStoreSerializer
from wishlists.models import Wishlist                    # ✅ NEW
from wishlists.serializers import WishlistSerializer     # ✅ Already needed
from wishlists.services import update_wishlist           # ✅ Already needed


class StoreView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = NearbyStoreSerializer

    def list(self, request):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lng')

        radius = 10  # kilometers
        number_of_stores_to_return = 100

        stores = get_nearby_stores_within(
            latitude=float(latitude),
            longitude=float(longitude),
            km=radius,
            limit=number_of_stores_to_return
        )

        serializer = NearbyStoreSerializer(stores, many=True)
        return Response(serializer.data)


class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def partial_update(self, request, pk=None):
        wishlist = update_wishlist(
            pk=pk,
            wishmaster=request.data.get('wishmaster'),
            status=request.data.get('status')
        )
        if wishlist is None:
            return Response({"error": "Wishlist not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
