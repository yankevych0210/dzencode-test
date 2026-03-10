import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { fetchOrders, openAddModal } from '../../store/slices/ordersSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import OrderItem from '../../components/OrderItem/OrderItem';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrdersChart from '../../components/OrdersChart/OrdersChart';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import './OrdersPage.css';

const OrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, selectedOrderId, loading } = useSelector((s: RootState) => s.orders);
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery.toLowerCase());
    const selectedOrder = items.find(o => o.id === selectedOrderId) ?? null;
    const isDetailOpen = selectedOrder !== null;

    const filtered = React.useMemo(() => items
        .filter(o => {
            if (!searchQuery) return true;
            const matchTitle = o.title.toLowerCase().includes(searchQuery);
            const orderProducts = o.products?.filter(p => p.order === o.id) || [];
            const matchProduct = orderProducts.some(p =>
                p.title.toLowerCase().includes(searchQuery) ||
                p.serialNumber.toString().includes(searchQuery)
            );
            return matchTitle || matchProduct;
        }),
        [items, searchQuery]);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="orders-page">
            <div className="orders-page__header">
                <button className="orders-page__add-btn" aria-label="Add order" onClick={() => dispatch(openAddModal())}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5">
                        <line x1="12" y1="4" x2="12" y2="20" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                    </svg>
                </button>
                <h1 className="orders-page__title">
                    Приходы / <span>{filtered.length}</span>
                </h1>
            </div>

            {loading ? (
                <div className="orders-page__loading" aria-label="Loading">
                    <span className="orders-page__spinner" />
                </div>
            ) : (
                <div className="orders-page__body">
                    <div className={`orders-page__list-wrap${isDetailOpen ? ' orders-page__list-wrap--narrow' : ''}`}>
                        <AnimatePresence>
                            {filtered.map(order => (
                                <OrderItem
                                    key={order.id}
                                    order={order}
                                    isSelected={selectedOrderId === order.id}
                                    compact={isDetailOpen}
                                />
                            ))}
                        </AnimatePresence>

                        {filtered.length === 0 && (
                            <p className="orders-page__empty">Нет приходов. Нажмите «+» чтобы добавить.</p>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {isDetailOpen ? (
                            <motion.div
                                key="detail"
                                className="orders-page__detail-wrap"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <OrderDetail order={selectedOrder} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chart"
                                className="orders-page__chart-wrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OrdersChart orders={filtered} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <DeleteModal />
        </div>
    );
};

export default OrdersPage;
