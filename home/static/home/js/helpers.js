// static/home/js/helpers.js
export function renderWishlists(containerId, wishlists) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing

    if (wishlists.length === 0) {
        container.innerHTML = "<p>No wishlists found.</p>";
        return;
    }

    const MAX_DISPLAY = 5;
    for (let wishlist of wishlists.slice(0, MAX_DISPLAY)) {
        const div = document.createElement("div");
        div.className = "wishlist";
        div.setAttribute("data-store-id", wishlist.store);  // ✅ add this
        div.innerHTML = `
            <p><strong>Buyer:</strong> ${wishlist.buyer}</p>
            <p><strong>Items:</strong> ${wishlist.items.join(', ')}</p>
            <p><strong>Status:</strong> ${wishlist.status}</p>
`;
container.appendChild(div);

   }
}