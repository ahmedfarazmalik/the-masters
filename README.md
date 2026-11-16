# THE MASTER'S - Restaurant Ordering Website

Static, mobile-first ordering website for THE MASTER'S (local fast food, Rawalpindi).
Built with plain HTML, CSS and JavaScript only. No frameworks, no database, no backend, no paid services.
Orders are sent by the customer through WhatsApp click-to-chat; payment is Cash on Delivery.

## Quick start
1. Open `js/config.js` and fill in the placeholders (start with `whatsappNumber`).
2. Replace the placeholder images in `assets/images/` (keep the file names).
3. Open `index.html` in a browser to test, then deploy to Netlify.
**Full instructions: `documentation/WEBSITE-GUIDE.md`. Placeholder list: `documentation/PLACEHOLDERS.md`.**

## Pages
`index.html` Home | `menu.html` Menu | `deals.html` Deals | `order.html` Order/Checkout | `about.html` About Us | `contact.html` Contact Us

## Structure
```
index.html menu.html deals.html order.html about.html contact.html
css/   style.css  responsive.css  animations.css
js/    config.js (all business settings)  products.js (menu + prices)
       cart.js (localStorage cart)  checkout.js (form + WhatsApp)  main.js (hours, nav, rendering)
assets/images/  categories/  banners/  deals/  logo/        assets/icons/
documentation/  WEBSITE-GUIDE.md  PLACEHOLDERS.md
```

## Key behaviour
- Ordering is allowed 4:00 PM - 12:00 AM Pakistan time (UTC+5); the site is browsable 24 hours. Outside hours: red banner, "Closed" buttons, checkout disabled.
- Time is taken from the web server's HTTP `Date` header when hosted, so a wrong phone clock does not matter (falls back to the device clock). This is browser-side only, see limitations.
- Delivery only to Faizabad, Shahmadabad, Dhok Kala Khan, Sixth Road.
- The site never says an order is confirmed; the customer must send the WhatsApp message and the owner confirms.

## Menu data notes
Prices were read from photos of the printed menus. Normalisations: "pratha" written as "Paratha", "chesse" as "Cheese", "Reg" as "Regular", "Ltr/Liter" as "Litre/Liter". Shakes list Small and Large as separate lines; "Shawarma Platter" carries the note "2 breads". **Please double-check every price against the original menu** (see the guide, section A).

## Limitations
No database, no admin, no payment gateway, no order history, browser-based hours are not a secure restriction, free hosting terms may change. Details in guide section M.
