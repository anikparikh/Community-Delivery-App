import { addWishlist, fetchNearbyWishlists } from './api.js';
import { renderWishlists } from './helpers.js';
import { setStoreNavigation } from './map.js';

export function updateSelectedStore(storeId) {
    window.STORE = storeId;
}

export async function createWishlist() {
    const wishlistInput = document.getElementById("wishlist-items").value.trim();
    const username = window.USERNAME;
    const storeId = window.STORE;

    if (username && storeId && wishlistInput) {
        await addWishlist(username, wishlistInput.split(","), storeId);
        const [lng, lat] = window.MAP_MARKER_COORDS || [];
        if (lat && lng) {
            await displayNearbyWishlists(lat, lng);
            await displayMyRequests(lat, lng);
            await displayMyTrips(lat, lng);
        }
    }
}

export async function displayNearbyWishlists(lat, lng) {
    try {
        const nearby = await fetchNearbyWishlists(lat, lng);
        renderWishlists('nearby-wishlists', nearby);

        // ✅ Delay ensures DOM is rendered before attaching
        setTimeout(() => {
            if (window.MAP && window.STORES_GEOJSON) {
                setStoreNavigation(window.MAP, window.STORES_GEOJSON);
            }
        }, 50);
    } catch (err) {
        console.error("Wishlist load failed", err);
    }
}

export async function displayMyRequests(lat, lng) {
    const my = await fetchNearbyWishlists(lat, lng, { buyer: USERNAME });
    renderWishlists('my-wishlists', my);
}

export async function displayMyTrips(lat, lng) {
    const trips = await fetchNearbyWishlists(lat, lng, { wishmaster: USERNAME });
    renderWishlists('my-trips', trips);
}
