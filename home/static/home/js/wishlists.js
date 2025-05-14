import { addWishlist } from './api.js';

export function updateSelectedStore(storeId) {
    window.STORE = storeId;
}

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
