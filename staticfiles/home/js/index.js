import { addMap, addGeocoder, convertToGeoJson, plotStoresOnMap } from './map.js';
import { fetchNearbyStores } from './api.js';
import { createWishlist, updateSelectedStore } from './wishlists.js'; // ✅ must exist

// Store selected store ID globally
let STORE = null;

// Function to set selected store ID and notify wishlists module
function setSelectedStore(storeId) {
    STORE = storeId;
    updateSelectedStore(storeId);
}

// Display stores near searched location
async function displayNearbyStores(latitude, longitude) {
    const stores = await fetchNearbyStores(latitude, longitude);
    console.log("Fetched stores:", stores);
    const storesGeoJson = convertToGeoJson(stores);
    console.log("GeoJSON:", storesGeoJson);
    plotStoresOnMap(map, storesGeoJson, setSelectedStore); // Pass handler
}

// Callback for when user selects a place from geocoder
function geocoderCallback(data) {
    const latitude = data.result.center[1];
    const longitude = data.result.center[0];
    displayNearbyStores(latitude, longitude);
}

// Initialize the map and geocoder
const map = addMap();
addGeocoder(map, geocoderCallback);

// Bind Add Wishlist button to handler
document.getElementById("add-wishlist").onclick = function (e) {
    window.STORE = STORE; // Make sure it's globally accessible
    createWishlist(); // This should POST data to backend
};
