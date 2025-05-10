from rest_framework import serializers
from .models import Store

class NearbyStoreSerializer(serializers.ModelSerializer):
    distance = serializers.SerializerMethodField()

    def get_distance(self, obj):
        return obj.distance.mi if hasattr(obj, 'distance') else 'N/A'

    class Meta:
        model = Store
        fields = [
            'id', 'name', 'rating', 'opening_hour', 'closing_hour',
            'store_type', 'address', 'latitude', 'longitude', 'distance'
        ]
