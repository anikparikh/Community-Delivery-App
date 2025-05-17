from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Wishlist
from .serializers import WishlistSerializer
from .services import create_wishlist, get_wishlists, update_wishlist  # ✅ include update_wishlist

class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def create(self, request):
        print("Incoming request data:", request.data)

        buyer = request.data.get('buyer')
        items = request.data.get('items')
        store = request.data.get('store')

        if not (buyer and items and store):
            print("Missing field(s):", buyer, items, store)
            return Response({"error": "Missing required fields"}, status=400)

        try:
            wishlist = create_wishlist(buyer, items, int(store))
        except Exception as e:
            print("Exception:", e)
            return Response({"error": str(e)}, status=400)

        wishlist_data = WishlistSerializer(wishlist, many=False)
        return Response(wishlist_data.data)

    def list(self, request):  # ✅ GET nearby wishlists
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lng')

        if not latitude or not longitude:
            return Response({"error": "Latitude and longitude are required"}, status=400)

        options = {}
        for key in ('buyer', 'wishmaster'):
            value = self.request.query_params.get(key)
            if value:
                options[key] = value

        try:
            wishlists = get_wishlists(float(latitude), float(longitude), options)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        wishlist_data = WishlistSerializer(wishlists, many=True)
        return Response(wishlist_data.data)

    def partial_update(self, request, pk=None):  # ✅ PATCH /wishlists/:id/
        wishlist = update_wishlist(
            pk=pk,
            wishmaster=request.data.get('wishmaster'),
            status=request.data.get('status')
        )

        if wishlist is None:
            return Response({"error": "Wishlist not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = WishlistSerializer(wishlist, many=False)
        return Response(serializer.data)
