// ✅ Fetch nearby stores
export async function fetchNearbyStores(latitude, longitude) {
    try {
        const response = await fetch(`/stores/?lat=${latitude}&lng=${longitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching nearby stores:", err);
        return [];
    }
}

// ✅ Add a wishlist
export async function addWishlist(buyer, items, storeId) {
    try {
        const response = await fetch('http://127.0.0.1:8000/wishlists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyer: buyer,
                items: items,
                store: storeId
            }),
        });

        if (!response.ok) {
            console.error("Failed to add wishlist", await response.json());
            throw new Error("Request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to add wishlist", error);
    }
}

// 🆕 Fetch wishlists (nearby, requests, or trips)
export async function fetchNearbyWishlists(latitude, longitude, options = {}) {
    let query = `lat=${latitude}&lng=${longitude}`;

    if (options.buyer) {
        query += `&buyer=${encodeURIComponent(options.buyer)}`;
    }

    if (options.wishmaster) {
        query += `&wishmaster=${encodeURIComponent(options.wishmaster)}`;
    }

    try {
        const response = await fetch(`/wishlists/?${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch wishlists:", error);
        return [];
    }
}
