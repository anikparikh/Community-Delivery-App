mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pa3AiLCJhIjoiY21hbG5ic2VqMGFsNzJucGs2anIyNWJzeiJ9.33P_U-2kFH0pgTTMKHTdWw';

function addMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-84.3880, 33.7490],
        zoom: 11
    });

    map.addControl(new mapboxgl.NavigationControl());
    return map;
}

function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    map.addControl(geocoder);

    geocoder.on("result", (data) => {
        geocoderCallback(data);
    });
}

export function convertToGeoJson(stores) {
    return {
        type: "FeatureCollection",
        features: stores.map(store => ({
            type: "Feature",
            geometry: {
                type: 'Point',
                coordinates: [store.longitude, store.latitude]
            },
            properties: {
                id: store.id,
                name: store.name,
                address: store.address,
                phone: store.phone,
                distance: store.distance,
                rating: store.rating
            }
        }))
    };
}

function plotStoresOnMap(map, storesGeoJson) {
    for (let store of storesGeoJson.features) {
        let el = document.createElement('div');
        el.className = 'store';
        el.title = `${store.properties.name}\n` +
                   `approximately ${store.properties.distance.toFixed(2)} km away\n` +
                   `Address: ${store.properties.address || "N/A"}\n` +
                   `Phone: ${store.properties.phone || "N/A"}\n` +
                   `Rating: ${store.properties.rating || "N/A"}`;

        el.addEventListener('click', () => {
            updateSelectedStore(store.properties.id); // ✅ add this
        });

        new mapboxgl.Marker(el)
            .setLngLat(store.geometry.coordinates)
            .addTo(map);
    }
}


// ✅ Export everything you want to use in index.js
export { addMap, addGeocoder, plotStoresOnMap };
