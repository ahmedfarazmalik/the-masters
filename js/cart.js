/* THE MASTER'S - Shopping cart (saved in the browser's localStorage) */
const Cart = (function () {
  const KEY = "mastersCart_v1";
  let memory = {};          // fallback if localStorage is blocked

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) || {} : {};
    } catch (e) { return memory; }
  }
  function write(cart) {
    memory = cart;
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent("cart:change"));
  }

  function qty(id) { return Number(read()[id]) || 0; }

  function setQty(id, n) {
    const cart = read();
    n = Math.max(0, Math.min(99, Math.floor(n)));
    if (n === 0) delete cart[id]; else cart[id] = n;
    write(cart);
  }
  function add(id) { setQty(id, qty(id) + 1); }
  function remove(id) { setQty(id, 0); }
  function clear() { write({}); }

  // Cart lines with current prices from products.js (unknown ids are ignored)
  function items() {
    const cart = read();
    const out = [];
    Object.keys(cart).forEach(id => {
      const p = findProduct(id);
      const q = Number(cart[id]) || 0;
      if (p && q > 0) out.push({ id: id, name: p.name, price: p.price, qty: q, total: p.price * q });
    });
    return out;
  }
  function count() { return items().reduce((s, i) => s + i.qty, 0); }
  function subtotal() { return items().reduce((s, i) => s + i.total, 0); }

  return { qty, setQty, add, remove, clear, items, count, subtotal };
})();
