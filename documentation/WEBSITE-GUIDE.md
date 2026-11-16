# THE MASTER'S - Website Guide

This guide is written for the restaurant owner. You do **not** need to be a programmer.
All changes are made by editing text files with any text editor (Notepad is fine; "VS Code" is nicer and free).

**Golden rules**
1. Make a copy of the whole folder before you edit (a backup).
2. Only change the text/numbers. Do not delete quotation marks `" "`, commas `,` or brackets `{ }`.
3. After editing, open the website and test it (see section J).

---
## A. How to change product prices

**File: `js/products.js`**

1. Open `js/products.js` in a text editor.
2. Find the product by its name (use Ctrl+F). Example line:
   `{ id: "burger-01", name: "Zinger Burger", price: 350 },`
3. Change the number after `price:`. Example: `price: 380`. Numbers only: no "Rs.", no commas.
4. Save the file.

**Add a new product** - copy one whole line inside the right category and change it:
`{ id: "burger-11", name: "My New Burger", price: 450 },`
- The `id` must be **unique** (never used twice anywhere). Use letters, numbers and dashes only.
- Keep the comma at the end of the line. The **last** item in a list has **no** comma after it.

**Remove a product** - delete its whole line.

**Deals** are in the `DEALS` list in the same file. Each deal has a `price` and an `items` list (the text shown to customers).

Customers' saved carts use the product `id`. If you remove a product, it simply disappears from their cart.

---
## B. How to change images

| What | Where | Exact file name (keep it!) |
|---|---|---|
| Burgers category | `assets/images/categories/` | `burgers-category.webp` |
| Shawarma & Wraps category | `assets/images/categories/` | `shawarma-wraps-category.webp` |
| Fried & Fries category | `assets/images/categories/` | `fried-fries-category.webp` |
| Shakes & Drinks category | `assets/images/categories/` | `shakes-drinks-category.webp` |
| Deals category | `assets/images/categories/` | `deals-category.webp` |
| Home page big banner | `assets/images/banners/` | `home-hero.webp` |
| Home "how to order" photo | `assets/images/banners/` | `featured-food.webp` |
| About Us photo | `assets/images/banners/` | `about-shop.webp` |
| Logo | `assets/images/logo/` | `the-masters-logo.png` |
| Deal photos (optional, not used yet) | `assets/images/deals/` | `deal-01.webp` ... `deal-13.webp` |

**To replace an image:** prepare your new image, rename it to the **exact** file name above, and paste it into the same folder, replacing the old file. No code change needed.

**Recommended sizes and formats**
- Category images: WebP, 800 x 600 px, under 100 KB.
- Home banner: WebP, 1600 x 900 px, under 250 KB (dark/clear photo so white text is readable).
- Featured food: WebP, 1000 x 800 px. About photo: WebP, 1000 x 700 px.
- Logo: PNG with transparent background, square, 400 x 400 px.
- Free tool to convert/shrink images to WebP: squoosh.app (runs in the browser).
- The images currently in the folders are **placeholders** that say "PLACEHOLDER IMAGE". Replace them.
- Please only use photos you own or have permission to use.

---
## C. How to change the WhatsApp number (orders go here)

**File: `js/config.js`**, line `whatsappNumber`.

1. Replace the placeholder: `whatsappNumber: "923001234567",`
2. **Format for Pakistan:** country code `92` + the mobile number **without the leading 0**. Digits only: no `+`, spaces or dashes.
   - `0300 1234567` becomes `923001234567`
   - `0345 9876543` becomes `923459876543`
3. The number must be 12 digits starting with `92`. Until it is, the website keeps the order button disabled and tells you the number is not set.
4. **Test:** open the website, add an item, go to Order, fill the form, tap **Place Order on WhatsApp**. WhatsApp must open a chat with your number with the order text ready. (Do the test during opening hours, see G.)

This single value is used for the order button, the Contact page and the footer.

### Current numbers (set on 16 Nov 2026)
- WhatsApp (orders): `whatsappNumber: "923262828629"` (this is 0326 2828629)
- Call: `callNumber: "03262828629"`

**Changing the number later, step by step (manual):**
1. Open the project folder and open `js/config.js` in Notepad or VS Code.
2. Find `whatsappNumber` and replace only the digits between the quotes. Write `92` + your mobile number without the first 0. Example: 0300 1234567 becomes `"923001234567"`. Must be exactly 12 digits.
3. Find `callNumber` and write the number normally, e.g. `"03001234567"`.
4. Save the file. If the site is on Netlify: upload the changed `config.js` to GitHub (open the file, pencil icon, paste, Commit changes). Netlify updates in 1-2 minutes.
5. Test: open the site, add an item, fill the order form and tap Place Order. WhatsApp must open to the new number. The Contact page, footer and all Call/WhatsApp buttons change automatically; you edit only this one file.

---
## D. How to change the call number

**File: `js/config.js`**, line `callNumber`. Example: `callNumber: "03001234567",`
It is used for the "Call Now" buttons and shown on the Contact page and footer.

---
## E. How to change delivery areas

**File: `js/config.js`**, list `deliveryAreas`.
- **Add:** copy a line and change the name: `{ name: "New Area", charge: null },`
- **Remove:** delete its line.
- Keep commas between lines (none after the last one).
The Order page dropdown, About, footer and validation all use this list automatically. The website refuses any area not on the list.

---
## F. How to change delivery charges

**File: `js/config.js`**, in the same `deliveryAreas` list, change `charge`:
- `charge: 100` = Rs. 100 delivery for that area.
- `charge: 0` = free delivery.
- `charge: null` = "not set". Customers see "To be confirmed" and the WhatsApp message says the restaurant will confirm the charge. 

**Current setting: Rs. 150 for all four areas.** Each area can have a different charge.

---
## G. How to change opening and closing hours

**File: `js/config.js`**: `openTime` and `closeTime`, in 24-hour format `"HH:MM"`:
- 4:00 PM = `"16:00"`, 12:00 AM (midnight) = `"24:00"`.
- Example 5 PM to 1 AM is not supported as one range (it crosses midnight); use `"24:00"` as the latest closing time.
The times are always Pakistan Standard Time (UTC+5), whatever the customer's phone says. All "Open 4:00 PM to 12:00 AM" texts update automatically.

---
## H. How to change Google and social links

**File: `js/config.js`**:
- `googleMapsLink`: open your shop in Google Maps, tap **Share**, copy the link, paste between the quotes.
- `googleReviewLink`: in Google Business Profile, choose **Get more reviews / Share review form** and copy the link.
- `social`: paste your Facebook / Instagram / TikTok page links. A social link left empty `""` is hidden automatically.
While a Maps/Review link is empty, its button stays visible but shows a message that the link is not set yet.

---
## I. How to change restaurant information

- **Business name:** `restaurantName` in `js/config.js` (page titles in the HTML files still say THE MASTER'S; use Find & Replace across files if the name ever changes).
- **Address:** `address` in `js/config.js`.
- **About Us text:** `aboutParagraphs` in `js/config.js`. Each quoted line is one paragraph. Write only things that are true.
- **Contact details:** numbers and links, see C, D, H.

---
## J. How to test the website

Open `index.html` by double-clicking it (or test on your Netlify link, which is better for phone tests).
**Note:** when opened as a local file, the site uses the computer's clock for opening hours. On Netlify it asks the web server for the time.

1. **Cart:** on Menu, tap **Add to Cart**; a number appears on the floating cart button. Go to another page: the number must stay.
2. **Quantities:** use **+** and **-** on the cards and on the Order page; to remove an item press **-** until the quantity reaches 0 (it is removed automatically). Subtotal and total must update at once. Check by hand: 2 x Rs. 350 + 1 x Rs. 120 = Rs. 820.
3. **Checkout form:** press the button with the form empty: you should see red messages. Phone numbers must look like `03001234567`.
4. **Delivery area:** only the four areas appear; the address box is locked until an area is picked.
5. **WhatsApp message:** after a correct form, WhatsApp opens with the full order (name, numbers, area, address, items, subtotal, delivery, total, Cash on Delivery, instructions). **Press Send** to complete the test.
6. **Opening/closing hours:** during 4 PM-12 AM the top bar is green and checkout works. Outside, the bar is red, "Add to Cart" says "Closed" and the order button is disabled. To test, temporarily change `openTime`/`closeTime` in `js/config.js` (and change them back!).
7. **Mobile:** open the site on your phone. On a computer, press F12 in Chrome and click the phone icon to simulate screens. Check the menu button (three lines), buttons are easy to tap, nothing scrolls sideways.

---
## K. How to deploy for free (GitHub + Netlify)

1. **GitHub account:** go to github.com, click **Sign up**, follow the steps, verify your email.
2. **Repository:** click **+** (top right) > **New repository**. Name it `the-masters`. Choose Public or Private. Click **Create repository**.
3. **Upload the project:** unzip the project on your computer. In the new repository click **uploading an existing file**. Drag **the contents of the folder** (`index.html`, `css`, `js`, `assets`, etc.), not the zip itself. Click **Commit changes**. Check that `index.html` is visible at the top level of the repository.
4. **Netlify account:** go to netlify.com, click **Sign up**, choose **Sign up with GitHub**.
5. **Connect GitHub:** click **Add new site > Import an existing project > GitHub**, allow access, choose `the-masters`.
6. **Deploy:** leave the build command empty and the publish directory empty (or `/`). Click **Deploy**. In about a minute the site is live.
7. **Free subdomain:** Netlify gives an address like `random-name.netlify.app`. Change it in **Site configuration > Change site name** (e.g. `the-masters.netlify.app`) if the name is free.
8. **Updating the site:** edit the files, then in GitHub open the file, click the pencil icon, edit, **Commit changes** (or upload replaced files). Netlify re-deploys automatically within a minute or two. Clear your browser cache or reload twice to see changes.
(Netlify's drag-and-drop option at app.netlify.com/drop also works: drag the unzipped folder.)

---
## L. Domain information

- A **custom domain** is your own web address such as `themasters.pk` instead of `xyz.netlify.app`.
- **Buying later:** buy from a domain registrar (e.g. Namecheap, GoDaddy; `.pk` domains through a Pakistani registrar). Prices vary by registrar and are billed yearly.
- **Connecting:** in Netlify open **Domain management > Add a domain**, enter your domain and follow the instructions Netlify shows (you change DNS/nameserver settings at your registrar). Netlify normally provides a free HTTPS certificate.
- **Optional cost:** the domain name only. **Can stay free:** GitHub, Netlify's basic plan and the `.netlify.app` address, and WhatsApp click-to-chat. Check each provider's current pricing and limits yourself; they can change.

---
## M. Important limitations

- This is a **static website**. It has **no database** and stores **no orders**.
- Orders reach the restaurant **only through WhatsApp**. The customer **must tap Send** in WhatsApp. Opening WhatsApp does not mean an order was placed.
- The restaurant owner **manually confirms** every order (by WhatsApp reply or call).
- There is **no admin dashboard**, **no login**, **no online payment** (Cash on Delivery only), and **no automatic order history or sales reports**. Keep your WhatsApp chats as your record.
- **Opening hours are enforced in the browser, so they are not a secure server-side rule.** The site reads the time from the web server when possible (and falls back to the device clock), and always uses Pakistan time, but a technically skilled person can still bypass it, and a customer can open WhatsApp manually and message you any time. Always check the time of incoming messages.
- Because a customer's phone can be offline or WhatsApp may be missing, some orders may not arrive. Reply promptly.
- **Free hosting has usage limits and its terms may change.** Nothing here is a promise that any third-party service stays free forever.
- Menu prices on the website are copied from your printed menus; update them whenever the menu changes.
