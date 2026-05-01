// ============================================================
// CafeBuzz Store — Shared Data Layer
// Real-time sync via BroadcastChannel + localStorage
// ============================================================

const MENU = [
  { id: 1,  name: 'Espresso',               price: 180, category: 'coffee',  img: 'assets/espresso.jpg',      desc: 'Pure, bold espresso shot' },
  { id: 2,  name: 'Cafe Latte',             price: 280, category: 'coffee',  img: 'assets/latte.jpg',         desc: 'Espresso with steamed milk' },
  { id: 3,  name: 'Cappuccino',             price: 320, category: 'coffee',  img: 'assets/cappuccino.jpg',    desc: 'Rich espresso with smooth foam' },
  { id: 4,  name: 'Caffe Mocha',            price: 350, category: 'coffee',  img: 'assets/mocha.jpg',         desc: 'Espresso with chocolate and milk' },
  { id: 5,  name: 'Iced Caramel Macchiato', price: 420, category: 'coffee',  img: 'assets/macchiato.jpg',     desc: 'Espresso over cool milk and caramel' },
  { id: 6,  name: 'Signature Cold Brew',    price: 380, category: 'coffee',  img: 'assets/cold_brew.jpg',     desc: '12-hour cold steeped coffee' },
  { id: 7,  name: 'Matcha Green Tea',       price: 450, category: 'tea',     img: 'assets/matcha.jpg',        desc: 'Premium Japanese matcha' },
  { id: 8,  name: 'Classic Earl Grey',      price: 220, category: 'tea',     img: 'assets/earl_grey.jpg',     desc: 'Bergamot-infused black tea' },
  { id: 9,  name: 'Hibiscus Iced Tea',      price: 280, category: 'tea',     img: 'assets/hibiscus.jpg',      desc: 'Refreshing floral iced tea' },
  { id: 10, name: 'Masala Chai',            price: 150, category: 'tea',     img: 'assets/chai.jpg',          desc: 'Spiced Indian milk tea' },
  { id: 11, name: 'Butter Croissant',       price: 240, category: 'snacks',  img: 'assets/croissant.jpg',     desc: 'Flaky, buttery French pastry' },
  { id: 12, name: 'Avocado Toast',          price: 550, category: 'snacks',  img: 'assets/avocado_toast.jpg', desc: 'Multigrain toast with fresh avocado' },
  { id: 13, name: 'Blueberry Muffin',       price: 210, category: 'snacks',  img: 'assets/muffin.jpg',        desc: 'Fresh-baked blueberry muffin' },
  { id: 14, name: 'Veggie Sliders',         price: 380, category: 'snacks',  img: 'assets/sliders.jpg',       desc: 'Mini veggie patty sliders' },
  { id: 15, name: 'New York Cheesecake',    price: 480, category: 'dessert', img: 'assets/cheesecake.jpg',    desc: 'Classic creamy cheesecake' },
  { id: 16, name: 'Dark Choc Brownie',      price: 250, category: 'dessert', img: 'assets/brownie.jpg',       desc: 'Rich, fudgy chocolate brownie' },
  { id: 17, name: 'Glazed Donuts (x2)',     price: 190, category: 'dessert', img: 'assets/donut.jpg',         desc: 'Classic glazed ring donuts' },
  { id: 18, name: 'Espresso Tiramisu',      price: 520, category: 'dessert', img: 'assets/tiramisu.jpg',      desc: 'Coffee-soaked Italian dessert' },
];

const TOTAL_TABLES = 8;
const TABLE_SEATS  = [2, 4, 4, 6, 2, 4, 4, 6];

// BroadcastChannel — syncs across browser tabs instantly
let _channel = null;
try { _channel = new BroadcastChannel('cafebuzz-instore'); } catch(e) {}

const Store = {
  // ── INIT ──────────────────────────────────────────────────
  init() {
    if (!localStorage.getItem('cb_tables')) {
      const tables = Array.from({ length: TOTAL_TABLES }, (_, i) => ({
        id: i + 1, status: 'free', currentOrderId: null, seats: TABLE_SEATS[i]
      }));
      localStorage.setItem('cb_tables', JSON.stringify(tables));
    }
    if (!localStorage.getItem('cb_orders')) {
      localStorage.setItem('cb_orders', JSON.stringify([]));
    }
  },

  // ── GETTERS ───────────────────────────────────────────────
  getTables()        { return JSON.parse(localStorage.getItem('cb_tables') || '[]'); },
  getOrders()        { return JSON.parse(localStorage.getItem('cb_orders') || '[]'); },
  getTable(id)       { return this.getTables().find(t => t.id === id); },
  getOrder(oid)      { return this.getOrders().find(o => o.id === oid); },

  getTableOrder(tableId) {
    const t = this.getTable(tableId);
    if (!t || !t.currentOrderId) return null;
    return this.getOrder(t.currentOrderId);
  },

  getActiveOrders() {
    return this.getOrders()
      .filter(o => ['placed','preparing','ready'].includes(o.status))
      .sort((a,b) => a.timestamp - b.timestamp);
  },

  getTodayStats() {
    const all = this.getOrders();
    const today = new Date().toDateString();
    const todayAll = all.filter(o => new Date(o.timestamp).toDateString() === today);
    const done    = todayAll.filter(o => ['served','billed'].includes(o.status));
    return {
      totalOrders:  todayAll.length,
      revenue:      done.reduce((s,o) => s + o.total, 0),
      completed:    done.length,
      avgValue:     done.length ? Math.round(done.reduce((s,o) => s+o.total,0)/done.length) : 0
    };
  },

  // ── ACTIONS ───────────────────────────────────────────────
  placeOrder(tableId, items, notes = '') {
    const orders = this.getOrders();
    const tables = this.getTables();
    const order = {
      id:       'ORD-' + Date.now().toString().slice(-6),
      tableId,
      items:    items.map(i => ({...i})),
      notes,
      status:   'placed',
      total:    items.reduce((s,i) => s + i.price * i.qty, 0),
      timestamp: Date.now(),
      placedAt: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    };
    orders.push(order);
    localStorage.setItem('cb_orders', JSON.stringify(orders));

    const table = tables.find(t => t.id === tableId);
    if (table) {
      table.status = 'occupied';
      table.currentOrderId = order.id;
      localStorage.setItem('cb_tables', JSON.stringify(tables));
    }
    this._broadcast({ type: 'NEW_ORDER', order, tableId });
    return order;
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const tables = this.getTables();
    const order  = orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = status;
    if (status === 'ready')  order.readyAt  = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    if (status === 'served') {
      order.servedAt = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      const t = tables.find(t => t.id === order.tableId);
      if (t) t.status = 'bill';
    }
    localStorage.setItem('cb_orders', JSON.stringify(orders));
    localStorage.setItem('cb_tables', JSON.stringify(tables));
    this._broadcast({ type: 'ORDER_UPDATE', orderId, status, tableId: order.tableId });
  },

  clearTable(tableId) {
    const tables = this.getTables();
    const orders = this.getOrders();
    const table  = tables.find(t => t.id === tableId);
    if (!table) return;
    if (table.currentOrderId) {
      const o = orders.find(o => o.id === table.currentOrderId);
      if (o) o.status = 'billed';
      localStorage.setItem('cb_orders', JSON.stringify(orders));
    }
    table.status = 'free';
    table.currentOrderId = null;
    localStorage.setItem('cb_tables', JSON.stringify(tables));
    this._broadcast({ type: 'TABLE_CLEARED', tableId });
  },

  resetAll() {
    localStorage.removeItem('cb_tables');
    localStorage.removeItem('cb_orders');
    this.init();
    this._broadcast({ type: 'RESET' });
  },

  // ── BROADCAST ─────────────────────────────────────────────
  _broadcast(data) {
    if (_channel) _channel.postMessage(data);
    window.dispatchEvent(new CustomEvent('cb-update', { detail: data }));
  },

  onUpdate(cb) {
    if (_channel) _channel.onmessage = e => cb(e.data);
    window.addEventListener('cb-update', e => cb(e.detail));
  }
};

Store.init();
