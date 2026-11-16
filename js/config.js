/* ==========================================================================
   THE MASTER'S - SITE SETTINGS
   This is the ONLY file you need to edit for business information.
   Anything marked "PLACEHOLDER" has NOT been provided yet - replace it.
   After editing, save the file and re-upload / re-deploy the website.
   ========================================================================== */

const SITE_CONFIG = {

  /* ---- Basic information ------------------------------------------------ */
  restaurantName: "THE MASTER'S",
  city: "Rawalpindi, Pakistan",
  address: "PLACEHOLDER: Add the restaurant's full shop address here",

  /* ---- Contact numbers --------------------------------------------------- */
  // WhatsApp number that RECEIVES orders.
  // Format: country code + number, digits only. No +, spaces, dashes or leading 0.
  // Pakistan example: 0300 1234567  ->  "923001234567"
  whatsappNumber: "923262827629",          // Orders go here. To change: 0326 2828629 -> "92" + 3262828629

  // Number customers tap to CALL the restaurant. Normal local format is fine.
  callNumber: "03262827629",               // Shown on site + used by "Call Now" buttons

  /* ---- Opening hours (Pakistan Standard Time, UTC+5) ---------------------- */
  // 24-hour format "HH:MM". Use "24:00" for midnight (12:00 AM).
  openTime: "16:00",                       // 4:00 PM
  closeTime: "24:00",                      // 12:00 AM
  utcOffsetHours: 5,                       // Pakistan = UTC+5 (no daylight saving)

  /* ---- Delivery ------------------------------------------------------------
     Only these areas can be selected at checkout.
     charge: number in Rs. (e.g. 100), or null = "not set yet" (shown to the
     customer as "To be confirmed"). Use 0 for free delivery.                  */
  deliveryAreas: [
    { name: "Faizabad",       charge: 150 },   // Rs. 150 (change here)
    { name: "Shahmadabad",    charge: 150 },   // Rs. 150 (change here)
    { name: "Dhok Kala Khan", charge: 150 },   // Rs. 150 (change here)
    { name: "Sixth Road",     charge: 150 }    // Rs. 150 (change here)
  ],
  currency: "Rs.",

  /* ---- Links (leave "" until you have them; buttons then show "not set") -- */
  googleMapsLink: "",      // PLACEHOLDER - Google Maps "Share" link of the shop
  googleReviewLink: "",    // PLACEHOLDER - Google review link of the business
  social: {
    facebook: "",          // PLACEHOLDER
    instagram: "",         // PLACEHOLDER
    tiktok: ""             // PLACEHOLDER
  },

  /* ---- About Us text (each line = one paragraph) --------------------------- */
  aboutParagraphs: [
    "THE MASTER'S is a local fast food restaurant in Rawalpindi, Pakistan, serving burgers, shawarma and wraps, fried chicken and fries, and shakes and drinks.",
    "PLACEHOLDER: Add your own restaurant story here (who you are, what makes your food special). Edit aboutParagraphs in js/config.js."
  ]
};
