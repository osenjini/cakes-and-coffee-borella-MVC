# Cakes and Coffee Borella - Official Cafe Website

A responsive, high-conversion website for **Cakes and Coffee** located at 89 Dr N. M. Perera Mawatha (Cotta Road), Borella, Colombo 00800.

---

## 🌟 Key Features

1. **Artisan Brand & Ambiance**: Designed with a warm espresso and caramel color palette, typography (Playfair Display & Plus Jakarta Sans), and responsive layout for mobile and desktop.
2. **Real-Time Opening Hours Checker**: Automatically computes Sri Lanka time (UTC+5:30) and shows a live status badge (`Open Now • Closes 9:00 PM` or `Closed Now • Opens 7:30 AM`).
3. **Interactive Menu with Instant Filtering & Search**:
   - Filter by categories: *All, Hot Coffee, Cold & Iced Coffee, Cakes & Gateaux, Pastries & Desserts, Shakes & Mojitos, Savory & Bites*.
   - Live instant text search across item names, descriptions, and dietary tags.
   - Prices formatted in Sri Lankan Rupees (LKR).
4. **Smart WhatsApp Order Generator**:
   - Customers can add items to an order bag.
   - Select order type (*Takeaway, Dine-In, Delivery*), enter customer name, and add preparation notes.
   - Formats a structured order message and opens WhatsApp directly to `+94 70 422 3300` with 1 click.
5. **Custom Celebration Cake Inquiry Form**:
   - Dedicated modal for milestone cakes (Birthdays, Anniversaries).
   - Allows choosing flavor, cake weight (1kg to 3kg+), required date, and custom piped inscription message.
6. **Social Proof & Google Reviews**:
   - Showcases the authentic **4.6 ★ rating from 98 Google reviews**.
   - Direct link to Google Maps reviews.
7. **Interactive Map & Location Details**:
   - Embedded Google Map for 89 Dr N. M. Perera Mawatha, Colombo 00800.
   - Peak hours guide (9:00 AM & 5:00 PM rush).
   - Direct links for Uber Eats delivery.

---

## 📁 File Structure

```
cakes-and-coffee-borella/
│
├── index.html          # Main HTML structure with semantic sections
├── css/
│   └── styles.css      # Custom warm-tone styling, animations & scrollbars
├── js/
│   └── app.js          # Menu filtering, search, cart state & WhatsApp integrations
├── data/
│   └── menu.js         # Menu database, cafe details, hours, and testimonials
└── README.md           # Documentation & instructions
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double click `index.html` or open it with your favorite browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
In PowerShell or terminal:
```bash
cd "C:\Users\osand\.gemini\antigravity\scratch\cakes-and-coffee-borella"
python -m http.server 8000
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

---

## 🌐 Free 1-Click Deployment Options

* **GitHub Pages**: Push this directory to a GitHub repository and turn on GitHub Pages in repository settings.
* **Vercel / Netlify**: Drag-and-drop the `cakes-and-coffee-borella` folder directly onto [Netlify Drop](https://app.netlify.com/drop) or deploy via Vercel CLI.

---

## ⚙️ Customization

To edit cafe details, menu items, prices, or phone numbers, open:
* `data/menu.js`
  * Update `CAFE_INFO` object (phone number, address, opening/closing hours).
  * Add, remove, or modify items in `MENU_ITEMS`.
