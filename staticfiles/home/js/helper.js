// static/home/js/helpers.js
export function renderWishlists(containerId, wishlists) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing

    if (wishlists.length === 0) {
        container.innerHTML = "<p>No wishlists found.</p>";
        return;
    }

    for (let wishlist of wishlists) {
        const div = document.createElement("div");
        div.className = "wishlist-item";
        div.innerHTML = `
            <p><strong>Buyer:</strong> ${wishlist.buyer}</p>
            <p><strong>Items:</strong> ${wishlist.items.join(', ')}</p>
            <p><strong>Status:</strong> ${wishlist.status}</p>
        `;
        container.appendChild(div);
    }
}
