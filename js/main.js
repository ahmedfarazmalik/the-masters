/* THE MASTER'S - shared site logic: opening hours, navigation, menu rendering */
const Site = (function () {
  const C = SITE_CONFIG;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = n => C.currency + " " + Number(n).toLocaleString("en-US");

  /* ---------------- Opening hours (Pakistan time) ---------------- */
  let clockOffset = 0; // server time minus device time, in ms
  const toMin = t => { const p = t.split(":"); return Number(p[0]) * 60 + Number(p[1]); };
  function pkMinutes() {
    const d = new Date(Date.now() + clockOffset + C.utcOffsetHours * 3600000);
    return d.getUTCHours() * 60 + d.getUTCMinutes();
  }
  function isOpen() { const m = pkMinutes(); return m >= toMin(C.openTime) && m < toMin(C.closeTime); }
  function fmt12(t) {
    const p = t.split(":"); let h = Number(p[0]) % 24; const m = p[1];
    return ((h % 12) || 12) + ":" + m + " " + (h < 12 ? "AM" : "PM");
  }
  const hoursText = () => fmt12(C.openTime) + " to " + fmt12(C.closeTime);

  // Ask our own web server for the time (HTTP "Date" header) so a wrong phone
  // clock does not matter. Falls back to the device clock if this fails.
  async function syncClock() {
    if (location.protocol === "file:") return;
    try {
      const t0 = Date.now();
      const r = await fetch(location.href.split("#")[0], { method: "HEAD", cache: "no-store" });
      const t1 = Date.now();
      const s = Date.parse(r.headers.get("Date") || "");
      if (!isNaN(s)) clockOffset = s - (t0 + t1) / 2;
    } catch (e) { /* keep device clock */ }
  }

  function updateStatus() {
    const bar = $("#statusBar");
    const open = isOpen();
    if (bar) {
      bar.className = "status-bar " + (open ? "is-open" : "is-closed");
      bar.innerHTML = open
        ? "<span class='dot'></span> We are OPEN. Orders accepted until " + fmt12(C.closeTime) + " (Pakistan Time)."
        : "<span class='dot'></span> We are CLOSED right now. Orders are accepted " + hoursText() + " (Pakistan Time). You can still browse the menu.";
    }
    document.body.classList.toggle("shop-closed", !open);
    refreshControls();
    document.dispatchEvent(new CustomEvent("hours:change"));
  }

  /* ---------------- Config checks ---------------- */
  const waReady = () => /^92\d{10}$/.test(C.whatsappNumber);
  const callReady = () => /^\+?[\d\s-]{9,}$/.test(C.callNumber);
  function chargeFor(areaName) {
    const a = C.deliveryAreas.find(x => x.name === areaName);
    return a ? a.charge : undefined; // undefined = no area, null = not set
  }

  /* ---------------- Links and text from config ---------------- */
  function setLink(el, url, msg) {
    if (url) {
      el.href = url;
      if (/^https?:/.test(url)) { el.target = "_blank"; el.rel = "noopener"; }
    } else {
      el.href = "#";
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.addEventListener("click", e => { e.preventDefault(); alert(msg); });
    }
  }
  function fillConfig() {
    $$("[data-site-name]").forEach(e => e.textContent = C.restaurantName);
    $$("[data-city]").forEach(e => e.textContent = C.city);
    $$("[data-address]").forEach(e => e.textContent = C.address);
    $$("[data-hours]").forEach(e => e.textContent = hoursText() + " (Pakistan Time)");
    $$("[data-call-text]").forEach(e => e.textContent = C.callNumber);
    $$("[data-areas]").forEach(e => e.textContent = C.deliveryAreas.map(a => a.name).join(", "));
    $$("[data-areas-list]").forEach(e => e.innerHTML = C.deliveryAreas.map(a => "<li>" + a.name + "</li>").join(""));
    $$("[data-wa-link]").forEach(e => setLink(e,
      waReady() ? "https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent("Hello " + C.restaurantName + ", I have a question.") : "",
      "The restaurant WhatsApp number has not been set yet (js/config.js)."));
    $$("[data-call-link]").forEach(e => setLink(e,
      callReady() ? "tel:" + C.callNumber.replace(/[^\d+]/g, "") : "",
      "The restaurant call number has not been set yet (js/config.js)."));
    $$("[data-map-link]").forEach(e => setLink(e, C.googleMapsLink, "The Google Maps link has not been set yet (js/config.js)."));
    $$("[data-review-link]").forEach(e => setLink(e, C.googleReviewLink, "The Google review link has not been set yet (js/config.js)."));
    $$("[data-social]").forEach(e => {
      const url = C.social[e.dataset.social];
      if (url) { e.href = url; e.target = "_blank"; e.rel = "noopener"; } else e.hidden = true;
    });
  }

  /* ---------------- Cart buttons ---------------- */
  function controlHTML(id) {
    const q = Cart.qty(id);
    if (!isOpen()) return "<button class='btn btn-sm' disabled>Closed</button>";
    if (q === 0) return "<button class='btn btn-gold btn-sm' data-act='add' data-id='" + id + "'>Add to Cart</button>";
    return "<div class='stepper'><button data-act='dec' data-id='" + id + "' aria-label='Decrease'>&minus;</button><span>" + q +
      "</span><button data-act='inc' data-id='" + id + "' aria-label='Increase'>+</button></div>";
  }
  function refreshControls() { $$("[data-ctl]").forEach(el => el.innerHTML = controlHTML(el.dataset.ctl)); }
  function refreshBadge() {
    const n = Cart.count();
    $$("[data-cart-count]").forEach(e => { e.textContent = n; e.hidden = n === 0; });
  }

  document.addEventListener("click", function (e) {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const id = b.dataset.id, a = b.dataset.act;
    if (a === "add") { if (!isOpen()) return alert("We are closed right now. Orders are accepted " + hoursText() + " (Pakistan Time)."); Cart.add(id); }
    else if (a === "inc") Cart.setQty(id, Cart.qty(id) + 1);
    else if (a === "dec") Cart.setQty(id, Cart.qty(id) - 1);
    else if (a === "remove") Cart.remove(id);
  });
  document.addEventListener("cart:change", () => { refreshBadge(); refreshControls(); });

  /* ---------------- Rendering ---------------- */
  function productCard(p) {
    return "<article class='pcard'><h3>" + p.name + "</h3>" + (p.note ? "<p class='note'>" + p.note + "</p>" : "") +
      "<div class='pcard-foot'><span class='price'>" + money(p.price) + "</span><div class='ctl' data-ctl='" + p.id + "'></div></div></article>";
  }
  function dealCard(d) {
    return "<article class='dcard reveal'><span class='tag'>" + d.name + "</span><ul>" +
      d.items.map(i => "<li>" + i + "</li>").join("") + "</ul>" +
      "<div class='pcard-foot'><span class='price'>" + money(d.price) + "</span><div class='ctl' data-ctl='" + d.id + "'></div></div></article>";
  }
  function catSection(cat, count, inner, gridClass) {
    return "<section class='cat reveal' id='" + cat.id + "'><div class='cat-head'><img src='" + cat.image + "' alt='" + cat.name +
      "' width='400' height='300' loading='lazy'><div><h2>" + cat.name + "</h2><p class='muted'>" + count + " items</p></div></div>" +
      "<div class='" + gridClass + "'>" + inner + "</div></section>";
  }

  function renderPages() {
    const menu = $("#menuRoot");
    if (menu) {
      $("#catChips").innerHTML = MENU.concat([DEALS_CATEGORY]).map(c => "<a href='#" + c.id + "'>" + c.name + "</a>").join("");
      menu.innerHTML = MENU.map(c => catSection(c, c.items.length, c.items.map(productCard).join(""), "grid")).join("") +
        catSection(DEALS_CATEGORY, DEALS.length, DEALS.map(dealCard).join(""), "grid deals-grid");
    }
    const deals = $("#dealsRoot");
    if (deals) deals.innerHTML = DEALS.map(dealCard).join("");
    const hd = $("#homeDeals");
    if (hd) hd.innerHTML = DEALS.slice(0, 3).map(dealCard).join("");
    const fc = $("#featuredCats");
    if (fc) fc.innerHTML = MENU.concat([DEALS_CATEGORY]).map(c =>
      "<a class='fcard reveal' href='" + (c.id === "deals" ? "deals.html" : "menu.html#" + c.id) + "'><img src='" + c.image +
      "' alt='' width='400' height='300' loading='lazy'><span>" + c.name + "</span></a>").join("");
  }

  /* ---------------- Page chrome ---------------- */
  function initNav() {
    const t = $(".nav-toggle"), n = $("#nav");
    if (!t) return;
    t.addEventListener("click", () => { const o = n.classList.toggle("open"); t.setAttribute("aria-expanded", o); });
    $$("#nav a").forEach(a => a.addEventListener("click", () => { n.classList.remove("open"); t.setAttribute("aria-expanded", "false"); }));
    const page = document.body.dataset.page;
    $$("#nav a").forEach(a => { if (a.dataset.page === page) a.classList.add("active"); });
  }
  function initFab() {
    if (document.body.dataset.page === "order") return;
    const a = document.createElement("a");
    a.href = "order.html"; a.className = "cart-fab"; a.setAttribute("aria-label", "View cart and checkout");
    a.innerHTML = "<svg viewBox='0 0 24 24' width='26' height='26' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='9' cy='20' r='1.5'/><circle cx='18' cy='20' r='1.5'/><path d='M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6'/></svg><span class='badge' data-cart-count hidden>0</span>";
    document.body.appendChild(a);
  }
  function initReveal() {
    const els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillConfig();
    renderPages();
    initNav();
    initFab();
    initReveal();
    refreshBadge();
    updateStatus();
    syncClock().then(updateStatus);
    setInterval(updateStatus, 30000);
    // About page text from config
    const about = $("#aboutText");
    if (about) about.innerHTML = C.aboutParagraphs.map(t => "<p>" + t + "</p>").join("");
  });

  return { C, $, $$, money, isOpen, hoursText, fmt12, waReady, callReady, chargeFor };
})();
