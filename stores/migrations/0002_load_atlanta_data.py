# Generated by Django 3.0.6 on 2020-09-20 14:50
from django.utils.timezone import now
from django.db import migrations
import json
from django.contrib.gis.geos import fromstr
from pathlib import Path

DATA_FILENAME = 'data/data.json'
CITY = 'Atlanta'

def load_data(apps, schema_editor):
    Store = apps.get_model('stores', 'Store')
    jsonfile = Path(__file__).parents[2] / DATA_FILENAME

    with open(str(jsonfile)) as datafile:
        objects = json.load(datafile)
        for obj in objects['elements']:
            try:
                objType = obj['type']
                if objType == 'node':
                    tags = obj['tags']
                    name = tags.get('name','N/A')

                    longitude = obj.get('lon', 0)
                    latitude = obj.get('lat', 0)
                    location = fromstr(f'POINT({longitude} {latitude})', srid=4326)

                    housenumber = tags.get('addr:housenumber', 'N/A')
                    street = tags.get('addr:street', 'N/A')
                    postcode = tags.get('addr:postcode', 'N/A')
                    address = housenumber + ',' + street + ',' + postcode

                    store_type = tags.get('shop', 'N/A')
                    phone = tags.get('phone', 'N/A')
                    
                    Store(
                        id=str(obj['id']),
                        name=name,
                        latitude=latitude,
                        longitude=longitude,
                        location=location,
                        store_type=store_type,
                        phone=phone[:100],
                        address=address[:100],
                        city=CITY,
                        created_at=now(),
                    ).save()
            except KeyError:
                pass  


class Migration(migrations.Migration):
    dependencies = [
        ('stores', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_data)
    ]

    class Meta:
        managed=False