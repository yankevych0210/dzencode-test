# 📦 Inventory Management SPA — Orders & Products

A modern Single Page Application for inventory management, built with React + TypeScript, Redux Toolkit, WebSocket for real-time features, and Docker for containerization.

## 🌟 Features

- **Orders (Приходи)**: View, click to expand detail panel, delete with confirmation modal
- **Products (Продукти)**: View all products with type filter
- **Real-time clock** in the header (updates every second)
- **Active session counter** via WebSocket — shows how many browser tabs have the app open
- **Route animations** via framer-motion
- **Multi-language** (Ukrainian / English) via i18next
- **Lazy loading** of page components
- **BEM CSS architecture** + Bootstrap
- **Docker** ready for one-command deployment

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| State | Redux Toolkit |
| Routing | React Router v6 |
| Animations | Framer Motion |
| CSS | BEM + Bootstrap + animate.css |
| HTTP | Axios |
| WebSocket | Socket.io-client |
| Charts | Recharts |
| i18n | i18next + react-i18next |
| Backend | Node.js + Express + Socket.io |
| Container | Docker + docker-compose |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Docker & Docker Compose (optional)

### Running Locally (Development)

**1. Start the backend server:**
```bash
cd server
npm install
npm start
# Server running at http://localhost:3001
```

**2. Start the React frontend:**
```bash
cd client
npm install --legacy-peer-deps
npm start
# App running at http://localhost:3000
```

**3. Open multiple tabs** at `http://localhost:3000` — the session counter in the top-right will update in real time!

### Running with Docker

```bash
# From the project root directory:
docker-compose up --build

# App will be available at http://localhost
# Backend API at http://localhost:3001
```

To stop:
```bash
docker-compose down
```

## 📁 Project Structure

```
.
├── client/                  # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components (BEM)
│   │   │   ├── TopMenu/     # Header with clock & session count
│   │   │   ├── NavSidebar/  # Left navigation sidebar
│   │   │   ├── OrderItem/   # Single order row
│   │   │   ├── OrderDetail/ # Slide-in order detail panel
│   │   │   ├── DeleteModal/ # Confirmation delete popup
│   │   │   └── ProductItem/ # Single product row
│   │   ├── pages/
│   │   │   ├── OrdersPage/  # Orders list page
│   │   │   └── ProductsPage/# Products list page with filter
│   │   ├── store/           # Redux store + slices
│   │   ├── hooks/           # Custom hooks (WebSocket, DateTime)
│   │   ├── utils/           # Date and price formatting
│   │   ├── types/           # TypeScript interfaces
│   │   └── i18n/            # Translations (uk, en)
│   ├── Dockerfile
│   └── nginx.conf
├── server/                  # Node.js + Express + Socket.io
│   ├── index.js             # Main server (REST API + WebSocket)
│   └── Dockerfile
├── docker-compose.yml
├── db-schema.sql            # MySQL Workbench compatible schema
└── README.md
```

## 🖥 Screens

| Screen | URL | Description |
|--------|-----|-------------|
| Orders | `/orders` | List of all orders with expand/delete |
| Products | `/products` | All products with type filter |

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders with their products |
| GET | `/api/orders/:id` | Get single order |
| DELETE | `/api/orders/:id` | Delete an order |
| GET | `/api/products` | Get all products |

## 🔌 WebSocket Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `connection` | client→server | — | New tab/session connects |
| `sessionCount` | server→client | `number` | Updated active session count |
| `disconnect` | client→server | — | Tab closed |

## 🌍 Internationalization

Toggle language between 🇺🇦 Ukrainian and 🇬🇧 English by clicking the language button at the bottom of the sidebar.

## 🧪 Self-Check

Before submitting, verify from scratch:
1. `cd server && npm install && npm start` — server starts
2. `cd client && npm install --legacy-peer-deps && npm start` — app opens at localhost:3000
3. Open 2 tabs → session counter shows 2
4. Click an order → detail panel slides in
5. Click delete → modal appears → confirm → order removed
6. Go to Products → filter by type → list filters correctly
