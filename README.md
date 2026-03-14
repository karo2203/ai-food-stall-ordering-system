# AI Powered Food Stall Ordering System

Responsive web application for a college food stall ordering system.
Customers can browse a colourful ice cream and juice menu, build a cart, place orders, and receive a token number, while staff use the built-in admin dashboard to track orders, revenue, and payments.
---

## Project description

This project is a **single‑page, AI‑inspired smart ordering interface** for a food stall.  
It focuses on:

- **Fast, frictionless ordering** for students on mobile devices.
- **Clear, real‑time visibility** of orders and payments for stall operators.
- **Zero backend setup** by using browser `localStorage` to persist orders and revenue for the day.

The UI is intentionally **bright, festive, and mobile‑first**, matching the atmosphere of a college food festival.

---

## Features

- **Interactive digital menu**
  - Separate tabs for **Ice Creams** and **Juices**.
  - All items defined in a central menu (names and prices).
  - Card‑style items with background images/gradients and “Tap to add” prompts.

- **Add‑to‑cart & order summary**
  - Tap any menu item to add it to the cart.
  - Adjust quantities with **+ / −** controls.
  - Remove individual items.
  - Live **item count** and **subtotal** in ₹ (INR).

- **Customer checkout**
  - Checkout form with **Name**, **Phone (optional)**, **Payment Method** (Cash / UPI / Card), and **Payment Status** (Paid / Pending).
  - “Place Order” button auto‑disables if the cart is empty.
  - On successful order:
    - Generates a unique **Token Number**.
    - Shows a confirmation box with token and friendly instructions.

- **Admin dashboard**
  - Top‑right **“Show Admin Panel”** button toggles the dashboard visibility.
  - Shows up‑to‑date daily stats:
    - **Total Orders Today**
    - **Total Revenue** (for Paid orders)
    - **Pending Payments** (number of orders not yet paid)
  - Orders table displaying:
    - **Token Number**
    - **Customer Name**
    - **Items & quantities**
    - **Total amount**
    - **Payment Status** (Paid / Pending)
  - Payment status can be updated inline from the table; all statistics update immediately.

- **Token management**
  - Tokens auto‑increment (stored in `localStorage`) to avoid clashes.
  - Token numbers and order data persist across page reloads in the same browser.

- **Mobile‑friendly, modern UI**
  - Fully responsive layout (grid‑based).
  - Festive gradients, pill buttons, and card components.
  - Uses the `Poppins` font for a clean, modern look.

---

## Technologies used

- **HTML5** – Structure of the single‑page application.
- **CSS3** – Custom responsive design, layout, and visual styling.
- **Vanilla JavaScript (ES6+)** – Application logic, state management, cart, and admin features.
- **Browser `localStorage`** – Lightweight persistence for orders, tokens, and metrics.
- **Google Fonts** – `Poppins` font for typography.

No external JS frameworks or build tools are required; everything runs directly in the browser.

---

## System workflow

1. **Customer browsing**
   - User lands on the home page.
   - Menu is built dynamically from the `MENU` data in `script.js`.
   - User switches between **Ice Creams** and **Juices** tabs.

2. **Adding items to cart**
   - User taps on an item card.
   - The item is added to the cart (or its quantity increases).
   - Cart section shows current items, quantities, and subtotal.

3. **Checkout**
   - User fills in basic details and selects payment method/status.
   - On clicking **Place Order**, the app:
     - Validates that the cart is not empty.
     - Calculates totals.
     - Generates a new **token number**.
     - Stores the full order in `localStorage` (with timestamp and token).
     - Clears the cart and shows the token confirmation.

4. **Admin monitoring**
   - Staff click **“Show Admin Panel”** at the top‑right.
   - The admin dashboard becomes visible and scrolls into view.
   - It loads all stored orders for **today**, calculates:
     - Total number of orders.
     - Total revenue for `Paid` orders.
     - Count of orders still `Pending`.
   - Orders table lists all details. Staff can flip individual orders between **Paid** and **Pending**, and the stats recalcuate immediately.

5. **Persistence**
   - Because data is stored in the browser’s `localStorage`, orders and token sequence survive page reloads on the same device/browser.
   - Clearing the browser storage (or using a different browser) resets the system.

---

## Project structure

```text
AI Prompt Project/
├─ index.html      # Main single‑page application (layout + markup)
├─ styles.css      # Global styling and responsive layout
└─ script.js       # App logic: menu, cart, checkout, admin dashboard
```

Key modules:

- **`index.html`**
  - Hero section with project title and **Show Admin Panel** button.
  - Customer area: tabs, menu, cart, checkout form, token display.
  - Admin area: dashboard card with stats and orders table.

- **`styles.css`**
  - Gradient background and festive styling.
  - Card components for menu, cart, and admin sections.
  - Responsive grid layout for content.
  - Utility classes for badges, buttons, tables, and visibility toggling.

- **`script.js`**
  - `MENU` object containing all items (names, categories, prices).
  - Cart management: add/update/remove items and compute totals.
  - Order creation, token incrementing, and `localStorage` persistence.
  - Admin dashboard rendering and real‑time statistics.
  - UI behaviour for tab switching and admin panel toggling.

---

## How to run the project

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari, etc.).
- No server or build tools required – this is a pure front‑end project.

### Steps

1. **Locate the project folder**
   - Navigate to your project directory, for example:  
     `c:\Users\Karoliya Agin Doli\OneDrive\Documents\AI Prompt Project`

2. **Open the application**
   - Double‑click `index.html`, or
   - Right‑click `index.html` → **Open with** → select your browser.

3. **Place a sample order**
   - Use the menu tabs to select items and add them to the cart.
   - Fill in the checkout form and click **Place Order**.
   - Note the generated **token number**.

4. **View the admin dashboard**
   - Click **Show Admin Panel** in the top‑right of the hero section.
   - Review **Total Orders Today**, **Total Revenue**, and **Pending Payments**.
   - Inspect the orders table and, if needed, adjust payment statuses.

---

## Customisation ideas

- Update menu data in `script.js` to match your real‑world stall offerings.
- Swap the image URLs or gradients in `IMAGE_PRESETS` for your own photos.
- Add simple authentication or a PIN before showing the admin panel.
- Extend `localStorage` usage or connect to a backend API for multi‑device dashboards.
- ## Developer

**Name:** Karoliya Agin Doli
**Project:** AI Powered Food Stall Ordering System
**Role:** Frontend Developer

**Technologies Used**

* HTML
* CSS
* JavaScript
* Local Storage
* Vercel Deployment
* GitHub

**GitHub:** https://github.com/karo2203


