import { addMap, addGeocoder, convertToGeoJson, plotStoresOnMap } from './map.js';
import { fetchNearbyStores } from './api.js';

let STORE = null;

function updateSelectedStore(storeId) {
    STORE = storeId;
}

async function displayNearbyStores(latitude, longitude) {
    const stores = await fetchNearbyStores(latitude, longitude);
    console.log("Fetched stores:", stores); // ✅ Add this
    const storesGeoJson = convertToGeoJson(stores);
    console.log("GeoJSON:", storesGeoJson); // ✅ Add this
    plotStoresOnMap(map, storesGeoJson);
}


function geocoderCallback(data) {
    const latitude = data.result.center[1];
    const longitude = data.result.center[0];
    displayNearbyStores(latitude, longitude);
}

const map = addMap();
addGeocoder(map, geocoderCallback);
