import {
    addMap,
    addGeocoder,
    convertToGeoJson,
    plotStoresOnMap,
    setStoreNavigation
} from './map.js';

import {
    createWishlist,
    updateSelectedStore,
    displayNearbyWishlists,
    displayMyRequests,
    displayMyTrips,
    updateWishlistStatus
} from './wishlists.js';

import { fetchNearbyStores } from './api.js';

let STORE = null;

function setSelectedStore(storeId) {
    STORE = storeId;
    updateSelectedStore(storeId);
}

async function displayNearbyStores(lat, lng) {
    const stores = await fetchNearbyStores(lat, lng);
    const geoJson = convertToGeoJson(stores);
    plotStoresOnMap(map, geoJson, setSelectedStore);

    window.MAP = map;
    window.STORES_GEOJSON = geoJson;

    await displayNearbyWishlists(lat, lng);
    await displayMyRequests(lat, lng);
    await displayMyTrips(lat, lng);
}

function geocoderCallback(data) {
    const lat = data.result.center[1];
    const lng = data.result.center[0];
    window.MAP_MARKER_COORDS = [lng, lat];
    displayNearbyStores(lat, lng);
}

const map = addMap();
addGeocoder(map, geocoderCallback);

document.getElementById("add-wishlist").onclick = () => {
    window.STORE = STORE;
    createWishlist();
};

const wishlistContainers = document.getElementsByClassName('wishlists');
for (let i = 0; i < wishlistContainers.length; i++) {
    wishlistContainers[i].addEventListener('click', updateWishlistStatus);
}

export function updateWishlistNode(icon, status) {
    if (status === 'ACCEPTED') {
        icon.className = 'accepted';
        icon.title = 'Mark as Fulfilled';
        icon.style.color = 'green'; // optional style cue
    } else if (status === 'FULFILLED') {
        icon.className = 'fulfilled';
        icon.title = 'Fulfilled';
        icon.style.color = 'gray';
    }
}
