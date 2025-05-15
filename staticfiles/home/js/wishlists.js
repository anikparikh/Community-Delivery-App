import { addWishlist, fetchNearbyWishlists } from './api.js';
import { renderWishlists } from './helpers.js'; // Make sure this is defined

export function updateSelectedStore(storeId) {
    window.STORE = storeId;
}

// ✅ Create a new wishlist
export async function createWishlist() {
    const wishlistInput = document.getElementById("wishlist-items").value.trim();
    const username = window.USERNAME;
    const storeId = window.STORE;

    if (username && storeId && wishlistInput) {
        await addWishlist(username, wishlistInput.split(","), storeId);
    } else {
        console.log("Missing input data:", username, storeId, wishlistInput);
    }
}

// ✅ Show all nearby wishlists in the first tab
export async function displayNearbyWishlists(latitude, longitude) {
    try {
        const nearbyWishlists = await fetchNearbyWishlists(latitude, longitude);
        renderWishlists('nearby-wishlists', nearbyWishlists);
    } catch (error) {
        console.error("Error loading nearby wishlists:", error);
    }
}

// ✅ Show wishlists you created (buyer = USERNAME)
export async function displayMyRequests(latitude, longitude) {
    try {
        const myWishlists = await fetchNearbyWishlists(latitude, longitude, { buyer: USERNAME });
        renderWishlists('my-wishlists', myWishlists);
    } catch (error) {
        console.error("Error loading my requests:", error);
    }
}

// ✅ Show wishlists you accepted (wishmaster = USERNAME)
export async function displayMyTrips(latitude, longitude) {
    try {
        const myTrips = await fetchNearbyWishlists(latitude, longitude, { wishmaster: USERNAME });
        renderWishlists('my-trips', myTrips);
    } catch (error) {
        console.error("Error loading my trips:", error);
    }
}
