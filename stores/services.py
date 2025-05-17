# services.py

from django.contrib.gis.geos import Point, GEOSGeometry
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
from django.core.exceptions import ObjectDoesNotExist

# ✅ Correct
from .models import Store


def get_nearby_stores_within(latitude: float, longitude: float, km: int = 10, limit: int = None, srid: int = 4326):
    coordinates = Point(float(longitude), float(latitude), srid=srid)
    point = GEOSGeometry(coordinates, srid=4326)

    return Store.objects.annotate(
        distance=Distance('location', coordinates)
    ).filter(
        location__distance_lte=(point, D(km=km))
    ).order_by(
        'distance'
    )[:limit]


def update_wishlist(pk: str, wishmaster: str = None, status: str = "ACCEPTED"):
    try:
        wishlist = Wishlist.objects.get(pk=pk)
        wishlist.wishmaster = wishmaster
        wishlist.status = status
        wishlist.save(update_fields=['wishmaster', 'status'])
        return wishlist
    except ObjectDoesNotExist:
        print("Wishlist does not exist")
        return None
