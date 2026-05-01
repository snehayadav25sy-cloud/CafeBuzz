# ☕ CafeBuzz - Cleveland's Finest Coffee Experience

![CafeBuzz Banner](https://via.placeholder.com/1000x300/120d0b/f5a623?text=CafeBuzz+In-Store+System)

CafeBuzz is a modern, responsive web application designed for a premium coffee shop. Originally a static brochure website, it has now been upgraded into a **Full-Stack In-Store Management Ecosystem** that runs entirely in the browser using real-time synchronization.

## ✨ Features

### 1. Customer Ordering App (`table.html`)
*   **QR Code Dine-In:** Customers scan a QR code at their table to open the menu.
*   **Dynamic Cart:** Add items, view order totals, and place orders directly from the table.
*   **Live Order Tracking:** See the status of the order change in real-time (Placed ➔ Preparing ➔ Ready ➔ Served).

### 2. Kitchen Display System (KDS) (`kitchen.html`)
*   **Real-time Alerts:** The kitchen receives new orders instantly with a visual alert and audio ping.
*   **Status Management:** Chefs can mark tickets as "Start Preparing" and "Mark Ready", which instantly updates the customer's phone and manager dashboard.

### 3. Manager Dashboard (`admin.html`)
*   **Live Floor Plan:** A visual map of tables (T1-T8) that changes color based on status (Free, Ordering, Bill Pending).
*   **Revenue Analytics:** Real-time calculation of Today's Revenue, Total Orders, and Average Order Value.
*   **Order Logging:** A persistent log of every order placed during the day.

### 4. Entry Portal (`portal.html`)
*   A centralized routing hub to easily navigate between the Customer App, Kitchen Display, and Manager Dashboard.

---

## 🚀 Getting Started

Since this relies on `localStorage` and `BroadcastChannel` for real-time synchronization, it is best run on a local HTTP server.

### 1. Clone the repository
```bash
git clone https://github.com/snehayadav25sy-cloud/CafeBuzz.git
cd CafeBuzz
```

### 2. Run the local server
You can use Python or Node.js to spin up a local server.

**Option A: Using Python (Recommended)**
```bash
python -m http.server 5500
```
Then navigate to `http://localhost:5500/portal.html`.

**Option B: Using Node.js**
```bash
npx serve . -p 3000
```
Then navigate to `http://localhost:3000/portal.html`.

### 3. Test the Real-Time Syncing!
To see the system in action, open these 3 tabs side-by-side in your browser:
1. `http://localhost:5500/admin.html` (Manager)
2. `http://localhost:5500/kitchen.html` (Chef)
3. `http://localhost:5500/table.html?table=1` (Customer)

Place an order on the Customer tab and watch it appear instantly on the Chef and Manager tabs without refreshing!

---
## 🛠️ Technology Stack
*   **Frontend:** HTML5, Vanilla CSS (Glassmorphism design), Vanilla JavaScript.
*   **Data Layer:** `localStorage` for data persistence.
*   **Real-Time Sync:** `BroadcastChannel API` for instant cross-tab communication.
*   **Icons:** FontAwesome 6.4.

## 📜 Acknowledgements
Founded and Developed by **Praneet Kumar Tiwari**, Cleveland, OH.
