# 🛒 Kartpool: Community-Powered Delivery Platform

Kartpool is a full-stack web application that enables hyperlocal delivery through neighbor-to-neighbor cooperation. Designed to empower local communities and small businesses, Kartpool connects residents with nearby stores and facilitates wishlist-based item delivery through volunteer fulfillment.

## 🚀 Features

- 🔍 **Location-Based Store Discovery**: 
  - Real-time store search based on user-selected coordinates using Mapbox.
  - Interactive markers that display store information like distance, address, phone, and rating.

- 📝 **Wishlist Creation**:
  - Users can select a store and submit a wishlist of essential items they need.
  - Wishlists are linked to store markers and displayed on a responsive interface.

- 👥 **Community Fulfillment Workflow**:
  - Users can view and accept wishlists from neighbors.
  - Accepted wishlists are assigned to the accepting user and marked as "ACCEPTED".
  - Once fulfilled, users can mark the wishlist as "FULFILLED".

- 🗺️ **Map-Based Navigation**:
  - Wishlist cards are linked to corresponding store markers on the map.
  - Clicking a wishlist card flies the map to the store’s location and opens a detailed popup.

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Mapbox, Geocoder API
- **Backend**: Python, Django, Django REST Framework, GeoDjango
- **Database**: PostgreSQL with PostGIS extension
- **Data Source**: OpenStreetMap data via Overpass Turbo

## 📸 Screenshots

https://github.com/anikparikh/Community-Delivery-App/blob/main/kartpool%202.png?raw=true

https://github.com/anikparikh/Community-Delivery-App/blob/main/kartpool.png?raw=true
## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/anikparikh/Community-Delivery-App.git
   cd Community-Delivery-App
   ```

2. Set up the Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the PostgreSQL database and enable PostGIS:
   ```bash
   # Ensure PostGIS is enabled
   CREATE EXTENSION postgis;
   ```

4. Apply migrations and load store data:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

6. Open in browser:
   ```text
   http://localhost:8000/home/?username=YOUR_USERNAME
   ```

## ✅ Status Transitions

- Wishlists can be in one of three states: `PENDING`, `ACCEPTED`, or `FULFILLED`.
- Status updates are handled via PATCH requests through a clean and interactive UI.

## 💡 Future Enhancements

- Karma point system for recognizing volunteers
- Real-time updates via WebSockets
- Store inventory previews
- Native mobile app support (PWA / React Native)
- Payment integration

## 👨‍💻 Author

**Anik Parikh** – [LinkedIn](https://linkedin.com/in/anikparikh) • [GitHub](https://github.com/anikparikh)

---

> Built to demonstrate technical skill, empathy for real-world community needs, and full-stack web development proficiency.
