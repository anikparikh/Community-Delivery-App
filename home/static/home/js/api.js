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
