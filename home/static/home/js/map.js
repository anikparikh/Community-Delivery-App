import { updateSelectedStore } from './wishlists.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pa3AiLCJhIjoiY21hbG5ic2VqMGFsNzJucGs2anIyNWJzeiJ9.33P_U-2kFH0pgTTMKHTdWw';

export function addMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-84.3880, 33.7490],
        zoom: 11
    });

    map.addControl(new mapboxgl.NavigationControl());
    return map;
}

export function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    map.addControl(geocoder);
    geocoder.on("result", geocoderCallback);
}

export function convertToGeoJson(stores) {
    return {
        type: "FeatureCollection",
        features: stores.map(store => ({
            type: "Feature",
            geometry: { type: 'Point', coordinates: [store.longitude, store.latitude] },
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

export function plotStoresOnMap(map, storesGeoJson, handleMarkerClick) {
    for (let store of storesGeoJson.features) {
        let el = document.createElement('div');
        el.className = 'store';
        el.title = `${store.properties.name}\nApproximately ${store.properties.distance?.toFixed(2) ?? 'N/A'} km`;

        el.addEventListener('click', () => {
            handleMarkerClick(store.properties.id);
            window.MAP_MARKER_COORDS = store.geometry.coordinates;
        });

        new mapboxgl.Marker(el)
            .setLngLat(store.geometry.coordinates)
            .addTo(map);
    }
}

export function flyToStore(map, point) {
    map.flyTo({
        center: point.geometry.coordinates,
        zoom: 20
    });
}

export function displayStoreDetails(map, point) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(point.geometry.coordinates)
        .setHTML(`
            <details>
                <summary><h2>${point.properties.name}</h2></summary>
                <dl>
                    <dt>Distance</dt>
                    <dd>${point.properties.distance.toFixed(2)} km</dd>
                    <dt>Address</dt>
                    <dd>${point.properties.address || 'N/A'}</dd>
                    <dt>Phone</dt>
                    <dd>${point.properties.phone || 'N/A'}</dd>
                    <dt>Rating</dt>
                    <dd>${point.properties.rating || 'N/A'}</dd>
                </dl>
            </details>
        `)
        .addTo(map);

    return popup;
}

export function setStoreNavigation(map, storesGeoJson) {
    const wishlistElements = document.getElementsByClassName('wishlist');
    console.log("📦 Attaching event listeners to", wishlistElements.length, "wishlist cards");

    for (let i = 0; i < wishlistElements.length; i++) {
        wishlistElements[i].onclick = (event) => {
            const storeId = event.currentTarget.getAttribute('data-store-id');
            console.log("🟢 Clicked wishlist card with storeId:", storeId);

            let found = false;

            for (let point of storesGeoJson.features) {
                const geoId = String(point.properties.id);
                if (storeId === geoId) {
                    console.log("✅ Match found: flying to", geoId);
                    flyToStore(map, point);
                    displayStoreDetails(map, point);
                    updateSelectedStore(storeId);
                    found = true;
                    break;
                }
            }

            if (!found) {
                console.warn("⚠️ No match found for storeId:", storeId);
                console.log("Available GeoJSON ids:", storesGeoJson.features.map(f => f.properties.id));
            }
        };
    }
}
