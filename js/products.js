/* ==========================================================================
   THE MASTER'S - MENU DATA (names and prices)
   To change a price: find the item, change the number after "price:".
   To add an item: copy one line, give it a NEW unique id, name and price.
   To remove an item: delete its whole line.
   Prices are in Pakistani Rupees (Rs.). Write numbers only (no commas).
   Every "id" must be unique - customers' carts are stored using the id.
   ========================================================================== */

const MENU = [
  {
    id: "burgers", name: "Burgers",
    image: "assets/images/categories/burgers-category.webp",
    items: [
      { id: "burger-01", name: "Zinger Burger", price: 350 },
      { id: "burger-02", name: "Zinger Cheese Burger", price: 400 },
      { id: "burger-03", name: "Mighty Zinger", price: 550 },
      { id: "burger-04", name: "Afghani Burger", price: 300 },
      { id: "burger-05", name: "Special Chicken Afghani", price: 400 },
      { id: "burger-06", name: "Anda Shami Burger", price: 170 },
      { id: "burger-07", name: "Anda Shami Lapeta Burger", price: 220 },
      { id: "burger-08", name: "Chicken Anda Shami Burger", price: 300 },
      { id: "burger-09", name: "Chicken Burger", price: 300 },
      { id: "burger-10", name: "Chicken Patty Burger", price: 300 }
    ]
  },
  {
    id: "shawarma-wraps", name: "Shawarma & Wraps",
    image: "assets/images/categories/shawarma-wraps-category.webp",
    items: [
      { id: "shawarma-01", name: "Small Shawarma", price: 120 },
      { id: "shawarma-02", name: "Medium Shawarma", price: 150 },
      { id: "shawarma-03", name: "Large Shawarma", price: 170 },
      { id: "shawarma-04", name: "Jumbo Shawarma", price: 200 },
      { id: "shawarma-05", name: "Special Cheese Shawarma", price: 250 },
      { id: "shawarma-06", name: "Shawarma Platter", note: "2 breads", price: 400 },
      { id: "shawarma-07", name: "Zinger Shawarma", price: 300 },
      { id: "shawarma-08", name: "Crispy Chicken Wrap", price: 400 },
      { id: "shawarma-09", name: "Chicken Cheesy Wrap", price: 350 },
      { id: "shawarma-10", name: "Seekh Kabab Wrap", price: 300 },
      { id: "shawarma-11", name: "Chicken Paratha", price: 300 },
      { id: "shawarma-12", name: "Zinger Paratha", price: 350 },
      { id: "shawarma-13", name: "BBQ Chicken Paratha", price: 350 },
      { id: "shawarma-14", name: "Seekh Kabab Paratha", price: 300 }
    ]
  },
  {
    id: "fried-fries", name: "Fried & Fries",
    image: "assets/images/categories/fried-fries-category.webp",
    items: [
      { id: "fried-01", name: "Zinger Piece", price: 170 },
      { id: "fried-02", name: "Leg Piece", price: 170 },
      { id: "fried-03", name: "Hot Wings (6 pcs)", price: 400 },
      { id: "fried-04", name: "Hot Wings (10 pcs)", price: 700 },
      { id: "fried-05", name: "Chicken Strips (6 pcs)", price: 400 },
      { id: "fried-06", name: "Chicken Strips (10 pcs)", price: 700 },
      { id: "fried-07", name: "Small Fries", price: 100 },
      { id: "fried-08", name: "Medium Fries", price: 150 },
      { id: "fried-09", name: "Large Fries", price: 200 },
      { id: "fried-10", name: "Crispy Mayo Fries", price: 350 },
      { id: "fried-11", name: "Chicken Mayo Fries", price: 300 }
    ]
  },
  {
    id: "shakes-drinks", name: "Shakes & Drinks",
    image: "assets/images/categories/shakes-drinks-category.webp",
    items: [
      { id: "shake-01s", name: "Apple Milkshake (Small)", price: 150 },
      { id: "shake-01l", name: "Apple Milkshake (Large)", price: 200 },
      { id: "shake-02s", name: "Banana Milkshake (Small)", price: 150 },
      { id: "shake-02l", name: "Banana Milkshake (Large)", price: 200 },
      { id: "shake-03s", name: "Apple Banana Mix (Small)", price: 150 },
      { id: "shake-03l", name: "Apple Banana Mix (Large)", price: 200 },
      { id: "shake-04s", name: "Mango Milkshake (Small)", price: 150 },
      { id: "shake-04l", name: "Mango Milkshake (Large)", price: 200 },
      { id: "shake-05s", name: "Banana Date Mix (Small)", price: 200 },
      { id: "shake-05l", name: "Banana Date Mix (Large)", price: 250 },
      { id: "drink-01", name: "NR Drinks", price: 100 },
      { id: "drink-02", name: "Half Litre Drink", price: 140 },
      { id: "drink-03", name: "1 Litre Drink", price: 180 },
      { id: "drink-04", name: "1.5 Litre Drink", price: 240 }
    ]
  }
];

/* ---- DEALS (13 deals from the deals menu) --------------------------------
   "items" is the list of what is included. Same rules: unique id, price in Rs. */
const DEALS_CATEGORY = {
  id: "deals", name: "Deals",
  image: "assets/images/categories/deals-category.webp"
};

const DEALS = [
  { id: "deal-01", name: "Deal 01", price: 400,  items: ["1 Zinger Burger", "Regular Fries", "Regular Drink"] },
  { id: "deal-02", name: "Deal 02", price: 500,  items: ["1 Zinger Burger", "1 Chicken Piece", "Regular Drink"] },
  { id: "deal-03", name: "Deal 03", price: 700,  items: ["5 Small Shawarma", "1 Liter Drink"] },
  { id: "deal-04", name: "Deal 04", price: 700,  items: ["2 Zinger Burger", "2 Drinks"] },
  { id: "deal-05", name: "Deal 05", price: 650,  items: ["3 Large Shawarma", "1 Liter Drink"] },
  { id: "deal-06", name: "Deal 06", price: 1000, items: ["2 Zinger Burger", "6 Wings", "1 Liter Drink"] },
  { id: "deal-07", name: "Deal 07", price: 750,  items: ["2 Zinger Burger", "1 Small Fries", "2 Regular Drink"] },
  { id: "deal-08", name: "Deal 08", price: 1000, items: ["3 Zinger Burger", "1 Medium Fries", "1 Liter Drink"] },
  { id: "deal-09", name: "Deal 09", price: 900,  items: ["2 Crispy Chicken Wraps", "1 Medium Fries", "2 Regular Drink"] },
  { id: "deal-10", name: "Deal 10", price: 750,  items: ["2 Anda Shami Burger", "2 Large Shawarma", "1 Liter Drink"] },
  { id: "deal-11", name: "Deal 11", price: 1650, items: ["5 Zinger Burger", "1 Large Fries", "1.5 Liter Drink"] },
  { id: "deal-12", name: "Deal 12", price: 900,  items: ["2 Chicken Afghani", "1 Liter Drink"] },
  { id: "deal-13", name: "Deal 13", price: 1000, items: ["6 Crispy Chicken Strips", "6 Chicken Wings", "1 Liter Drink"] }
];

/* Lookup helper used by the cart (do not edit) */
function findProduct(id) {
  for (const cat of MENU) {
    const hit = cat.items.find(p => p.id === id);
    if (hit) return hit;
  }
  return DEALS.find(d => d.id === id) || null;
}
