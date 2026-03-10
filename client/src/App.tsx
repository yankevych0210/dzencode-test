import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TopMenu from './components/TopMenu/TopMenu';
import NavSidebar from './components/NavSidebar/NavSidebar';
import ProductDeleteModal from './components/ProductDeleteModal/ProductDeleteModal';
import AddOrderModal from './components/AddOrderModal/AddOrderModal';
import AddProductModal from './components/AddProductModal/AddProductModal';
import './App.css';

const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const pageTransition = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app">
      <TopMenu />
      <div className="app__body">
        <NavSidebar />
        <main className="app__main">
          <Suspense fallback={
            <div className="app__suspense-loader">
              <div className="app__spinner" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                style={{ display: 'contents' }}
              >
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Navigate to="/orders" replace />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/groups" element={<PlaceholderPage title="Группы" />} />
                  <Route path="/users" element={<PlaceholderPage title="Пользователи" />} />
                  <Route path="/settings" element={<PlaceholderPage title="Настройки" />} />
                  <Route path="*" element={<Navigate to="/orders" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
      <ProductDeleteModal />
      <AddOrderModal />
      <AddProductModal />
    </div>
  );
};

export default App;
