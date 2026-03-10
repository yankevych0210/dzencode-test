const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// --- Mock Data ---
const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 50, symbol: 'USD', isDefault: 0 },
      { value: 1300, symbol: 'UAH', isDefault: 1 }
    ],
    order: 1,
    date: '2017-09-06 12:09:33'
  },
  {
    id: 3,
    serialNumber: 1234,
    isNew: 1,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Laptops',
    specification: 'Specification 3',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 300, symbol: 'USD', isDefault: 0 },
      { value: 7800, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 4,
    serialNumber: 1234,
    isNew: 0,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Phones',
    specification: 'Specification 4',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 200, symbol: 'USD', isDefault: 0 },
      { value: 5200, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2017-09-06 12:09:33'
  },
  {
    id: 5,
    serialNumber: 1234,
    isNew: 1,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 5',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 250, symbol: 'USD', isDefault: 0 },
      { value: 6500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 6,
    serialNumber: 1234,
    isNew: 0,
    photo: 'monitor.png',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Laptops',
    specification: 'Specification 6',
    guarantee: { start: '2017-06-04 00:00:00', end: '2025-08-06 00:00:00' },
    price: [
      { value: 150, symbol: 'USD', isDefault: 0 },
      { value: 3900, symbol: 'UAH', isDefault: 1 }
    ],
    order: 3,
    date: '2017-09-06 12:09:33'
  }
];

const orders = [
  {
    id: 1,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-06-29 12:09:33',
    description: 'First order description',
    get products() { return products }
  },
  {
    id: 2,
    title: 'Длинное название прихода',
    date: '2017-09-06 12:09:33',
    description: 'Second order description',
    get products() { return products }
  },
  {
    id: 3,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-06-06 12:09:33',
    description: 'Third order description',
    get products() { return products }
  }
];

// --- REST API ---
app.get('/api/orders', (req, res) => {
  // Using JSON logic evaluates getters safely.
  // Because the getter literally returns ALL products for EVERY order (per user snippet),
  // we just return the array to let the frontend filter.
  // We stringify and parse to trigger the getter.
  res.json(JSON.parse(JSON.stringify(orders)));
});

app.get('/api/orders/:id', (req, res) => {
  const parsedOrders = JSON.parse(JSON.stringify(orders));
  const order = parsedOrders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

app.delete('/api/orders/:id', (req, res) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Order not found' });
  orders.splice(idx, 1);
  res.json({ success: true });
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    ...req.body,
    id: Date.now(),
    date: new Date().toISOString().replace('T', ' ').substring(0, 19),
    get products() { return products }
  };
  orders.push(newOrder);
  res.json(JSON.parse(JSON.stringify(newOrder)));
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(idx, 1);
  res.json({ success: true, id: req.params.id });
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: Date.now(),
    date: new Date().toISOString()
  };
  products.push(newProduct);
  res.json(newProduct);
});

io.on('connection', (socket) => {
  io.emit('sessionCount', io.engine.clientsCount);

  socket.on('disconnect', () => {
    io.emit('sessionCount', io.engine.clientsCount);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
