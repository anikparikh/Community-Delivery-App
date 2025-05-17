import { addWishlist, fetchNearbyWishlists } from './api.js';
import { renderWishlists } from './helpers.js';
import { setStoreNavigation } from './map.js';
import { updateWishlist } from './api.js';
import { updateWishlistNode } from './index.js';

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


export async function updateWishlistStatus(event) {
    const className = event.target.className;
    const id = event.target.getAttribute('data-id');

    switch (className) {
        case 'accept':
            event.preventDefault();
            updateWishlist(id, {
                status: 'ACCEPTED',
                wishmaster: USERNAME
            }).then(() => {
                updateWishlistNode(event.target, 'ACCEPTED');
            }).catch(console.error);
            break;

        case 'accepted':
            event.preventDefault();
            updateWishlist(id, {
                status: 'FULFILLED',
                wishmaster: USERNAME
            }).then(() => {
                updateWishlistNode(event.target, 'FULFILLED');
            }).catch(console.error);
            break;
    }
}

export {
    addWishlist,
    fetchNearbyWishlists,
};
