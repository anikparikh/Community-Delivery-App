// static/home/js/helpers.js

export function renderWishlists(containerId, wishlists) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    if (wishlists.length === 0) {
        container.innerHTML = "<p>No wishlists found.</p>";
        return;
    }

    const MAX_DISPLAY = 5;

    for (let wishlist of wishlists.slice(0, MAX_DISPLAY)) {
        const div = document.createElement("div");
        div.className = "wishlist";
        div.setAttribute("data-store-id", wishlist.store);
        div.setAttribute("data-id", wishlist.id);

        let iconClass = '';
        let iconTitle = '';
        let iconColor = '';

        if (wishlist.status === 'PENDING') {
            iconClass = 'accept';
            iconTitle = 'Accept this wishlist';
            iconColor = 'gray';
        } else if (wishlist.status === 'ACCEPTED') {
            iconClass = 'accepted';
            iconTitle = 'Mark as Fulfilled';
            iconColor = 'green';
        } else if (wishlist.status === 'FULFILLED') {
            iconClass = 'fulfilled';
            iconTitle = 'Fulfilled';
            iconColor = 'darkgray';
        }

        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p><strong>Buyer:</strong> ${wishlist.buyer}</p>
              <p><strong>Items:</strong> ${wishlist.items.join(', ')}</p>
              <p><strong>Status:</strong> ${wishlist.status}</p>
            </div>
            ${iconClass !== 'fulfilled' ? `
              <i class="${iconClass}"
                 data-id="${wishlist.id}"
                 title="${iconTitle}"
                 style="cursor: pointer; color: ${iconColor}; font-size: 1.5rem;">
                 &#128722;
              </i>
            ` : ''}
          </div>
        `;

        container.appendChild(div);
    }
}
