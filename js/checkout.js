/* THE MASTER'S - Order page: cart review, form validation, WhatsApp message */
(function () {
  const S = Site, C = SITE_CONFIG;
  const form = document.getElementById("orderForm");
  if (!form) return;

  const f = {
    name: form.elements.customerName, wa: form.elements.whatsapp, call: form.elements.callNumber,
    same: form.elements.sameNumber, area: form.elements.area, addr: form.elements.address, note: form.elements.instructions
  };
  const btn = document.getElementById("placeOrder");
  const cartBox = document.getElementById("cartList");
  const sumBox = document.getElementById("summary");
  const notice = document.getElementById("orderNotice");
  const after = document.getElementById("afterOrder");

  /* ---------- Phone helpers (Pakistan) ---------- */
  function normPhone(v) {
    let d = String(v).replace(/[\s\-()]/g, "");
    if (d.indexOf("+") === 0) d = d.slice(1);
    if (d.indexOf("0092") === 0) d = d.slice(4);
    if (d.indexOf("92") === 0 && d.length === 12) d = "0" + d.slice(2);
    return d;
  }
  const validMobile = v => /^03\d{9}$/.test(v);
  const validCall = v => /^(03\d{9}|0\d{9,10})$/.test(v);

  /* ---------- Delivery area dropdown ---------- */
  f.area.innerHTML = "<option value=''>Select delivery area</option>" +
    C.deliveryAreas.map(a => "<option value='" + a.name + "'>" + a.name + "</option>").join("");

  function syncAddress() {
    const has = f.area.value !== "";
    f.addr.disabled = !has;
    f.addr.placeholder = has ? "House number, street, nearby landmark, other details" : "Please select your delivery area first";
  }
  function syncCall() {
    if (f.same.checked) { f.call.value = f.wa.value; f.call.readOnly = true; } else f.call.readOnly = false;
  }

  /* ---------- Cart + summary ---------- */
  function totals() {
    const sub = Cart.subtotal();
    const charge = S.chargeFor(f.area.value); // undefined | null | number
    const known = typeof charge === "number";
    return { sub: sub, charge: charge, known: known, total: sub + (known ? charge : 0) };
  }
  function renderCart() {
    const items = Cart.items();
    if (!items.length) {
      cartBox.innerHTML = "<div class='empty'><p>Your cart is empty.</p><a class='btn btn-gold' href='menu.html'>Browse Menu</a></div>";
    } else {
      cartBox.innerHTML = items.map(i =>
        "<div class='crow'><div class='cname'><strong>" + i.name + "</strong><span class='muted'>" + S.money(i.price) + " each</span></div>" +
        "<div class='stepper'><button data-act='dec' data-id='" + i.id + "' aria-label='Decrease'>&minus;</button><span>" + i.qty +
        "</span><button data-act='inc' data-id='" + i.id + "' aria-label='Increase'>+</button></div>" +
        "<div class='ctotal'>" + S.money(i.total) + "</div>" + "</div>").join("");
    }
    renderSummary();
    updateButton();
  }
  function renderSummary() {
    const t = totals();
    const delivery = t.charge === undefined ? "Select area" : (t.known ? S.money(t.charge) : "To be confirmed");
    sumBox.innerHTML =
      "<div class='srow'><span>Subtotal</span><strong>" + S.money(t.sub) + "</strong></div>" +
      "<div class='srow'><span>Delivery charges</span><strong>" + delivery + "</strong></div>" +
      "<div class='srow total'><span>Final total</span><strong>" + S.money(t.total) + "</strong></div>" +
      (t.known ? "" : "<p class='muted small'>Delivery charges will be confirmed by the restaurant on WhatsApp and added to this total.</p>");
  }
  function updateButton() {
    const items = Cart.items().length;
    let msg = "";
    if (!S.isOpen()) msg = "<strong>We are closed right now.</strong> Orders are accepted " + S.hoursText() + " (Pakistan Time). You cannot place an order at the moment.";
    else if (!S.waReady()) msg = "<strong>Ordering is not ready yet.</strong> The restaurant WhatsApp number has not been set (js/config.js).";
    else if (!items) msg = "Your cart is empty. Add items from the menu to continue.";
    notice.innerHTML = msg;
    notice.hidden = !msg;
    btn.disabled = !!msg;
    btn.textContent = !S.isOpen() ? "RESTAURANT CLOSED" : "PLACE ORDER ON WHATSAPP";
  }

  /* ---------- Validation ---------- */
  function setErr(field, text) {
    const holder = field.closest(".field");
    const el = holder.querySelector(".err");
    el.textContent = text || "";
    field.setAttribute("aria-invalid", text ? "true" : "false");
    return text ? field : null;
  }
  function validate() {
    const bad = [];
    const push = x => { if (x) bad.push(x); };
    push(setErr(f.name, f.name.value.trim().length < 2 ? "Please enter your name." : ""));
    push(setErr(f.wa, validMobile(normPhone(f.wa.value)) ? "" : "Enter a valid mobile number, e.g. 03001234567."));
    const callVal = f.same.checked ? f.wa.value : f.call.value;
    push(setErr(f.call, validCall(normPhone(callVal)) ? "" : "Enter a valid call number, e.g. 03001234567."));
    const areaOk = C.deliveryAreas.some(a => a.name === f.area.value);
    push(setErr(f.area, areaOk ? "" : "Please select one of our delivery areas."));
    push(setErr(f.addr, f.addr.value.trim().length < 10 ? "Please enter your complete delivery address (house no., street, landmark)." : ""));
    return bad;
  }

  /* ---------- WhatsApp message ---------- */
  function buildMessage() {
    const t = totals(), items = Cart.items();
    const wa = normPhone(f.wa.value), call = normPhone(f.same.checked ? f.wa.value : f.call.value);
    const lines = [];
    lines.push("*" + C.restaurantName + " - NEW ORDER*", "");
    lines.push("*Customer Name:* " + f.name.value.trim());
    lines.push("*WhatsApp Number:* " + wa);
    lines.push("*Call Number:* " + call);
    lines.push("*Delivery Area:* " + f.area.value);
    lines.push("*Complete Address:* " + f.addr.value.trim().replace(/\s*\n\s*/g, ", "), "");
    lines.push("*Ordered Items:*");
    items.forEach((i, n) => {
      lines.push((n + 1) + ". " + i.name);
      lines.push("   Qty: " + i.qty + " x " + S.money(i.price) + " = " + S.money(i.total));
    });
    lines.push("");
    lines.push("*Subtotal:* " + S.money(t.sub));
    lines.push("*Delivery Charges:* " + (t.known ? S.money(t.charge) : "To be confirmed by restaurant"));
    lines.push("*Final Total:* " + S.money(t.total) + (t.known ? "" : " + delivery (to be confirmed)"), "");
    lines.push("*Payment Method:* Cash on Delivery");
    const note = f.note.value.trim();
    lines.push("*Order Instructions:* " + (note ? note.replace(/\s*\n\s*/g, ", ") : "None"));
    return lines.join("\n");
  }

  /* ---------- Events ---------- */
  f.area.addEventListener("change", () => { syncAddress(); renderSummary(); });
  f.same.addEventListener("change", syncCall);
  f.wa.addEventListener("input", () => { if (f.same.checked) f.call.value = f.wa.value; });
  document.addEventListener("cart:change", renderCart);
  document.addEventListener("hours:change", updateButton);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    updateButton();
    if (btn.disabled) return;                       // closed / not configured / empty cart
    if (!S.isOpen()) return;                        // re-check at the moment of sending
    const bad = validate();
    if (bad.length) { bad[0].focus(); return; }
    const url = "https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent(buildMessage());
    after.hidden = false;
    after.innerHTML =
      "<h3>One more step: send the message in WhatsApp</h3>" +
      "<p>WhatsApp should now open with your order already typed. <strong>You must press SEND in WhatsApp.</strong> " +
      "Your order is <strong>not placed</strong> until the restaurant receives your message, and it is only confirmed once the restaurant replies.</p>" +
      "<p>WhatsApp did not open? <a class='btn btn-gold btn-sm' href='" + url + "' target='_blank' rel='noopener'>Open WhatsApp again</a></p>" +
      "<p class='muted small'>Message sent already? <button type='button' class='linkbtn' id='clearCart'>Clear my cart</button></p>";
    document.getElementById("clearCart").addEventListener("click", () => { Cart.clear(); after.hidden = true; });
    after.scrollIntoView({ behavior: "smooth", block: "center" });
    const w = window.open(url, "_blank");
    if (!w) window.location.href = url;             // pop-up blocked: open in same tab
  });

  syncAddress();
  renderCart();
})();
