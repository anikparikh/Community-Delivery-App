from rest_framework.response import Response
from rest_framework import viewsets
from .models import Wishlist
from .serializers import WishlistSerializer
from .services import create_wishlist

class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def create(self, request):  # ✅ Must be inside the class
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
