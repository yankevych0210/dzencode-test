import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '../../types';
import { formatShort, formatLong } from '../../utils/formatDate';
import { getTotalPrice } from '../../utils/formatPrice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSelectedOrder, openDeleteModal } from '../../store/slices/ordersSlice';
import './OrderItem.css';

interface Props {
    order: Order;
    isSelected: boolean;
    compact?: boolean;
}

const ListIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" width="22" height="22">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
);

const OrderItem: React.FC<Props> = ({ order, isSelected, compact = false }) => {
    const dispatch = useAppDispatch();

    // Explicitly filter products to this order's ID because the 
    // mock data getter (get products() { return products }) returns all products inside every order.
    const orderProducts = order.products?.filter(p => p.order === order.id) ?? [];

    const productCount = orderProducts.length;
    const usdTotal = getTotalPrice(orderProducts, 'USD');
    const uahTotal = getTotalPrice(orderProducts, 'UAH');

    const handleSelect = () => dispatch(setSelectedOrder(isSelected ? null : order.id));
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(openDeleteModal(order.id));
    };

    // Compact mode — shown when detail panel is open (sidebar-style cards)
    if (compact) {
        return (
            <motion.div
                className={`order-item order-item--compact${isSelected ? ' order-item--selected' : ''}`}
                onClick={handleSelect}
                whileHover={{ x: 2 }}
                layout
                id={`order-item-${order.id}`}
            >
                <div className="order-item__compact-left">
                    <div className="order-item__products-icon"><ListIcon /></div>
                    <div className="order-item__compact-info">
                        <span className="order-item__count">{productCount}</span>
                        <span className="order-item__count-label">Продукта</span>
                    </div>
                </div>
                <div className="order-item__compact-dates">
                    <span className="order-item__date-short">{formatShort(order.date)}</span>
                    <span className="order-item__date-long">{formatLong(order.date)}</span>
                </div>
                {isSelected && (
                    <div className="order-item__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5fb346" strokeWidth="2.5" width="14" height="14">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                )}
            </motion.div>
        );
    }

    // Full mode — no detail panel open
    return (
        <motion.div
            className={`order-item${isSelected ? ' order-item--selected' : ''}`}
            onClick={handleSelect}
            whileHover={{ scale: 1.002 }}
            layout
            id={`order-item-${order.id}`}
        >
            <div className="order-item__title">{order.title}</div>

            <div className="order-item__products">
                <div className="order-item__products-icon"><ListIcon /></div>
                <span className="order-item__count">{productCount}</span>
                <span className="order-item__count-label">Продукта</span>
            </div>

            <div className="order-item__dates">
                <div className="order-item__date-short">{formatShort(order.date)}</div>
                <div className="order-item__date-long">{formatLong(order.date)}</div>
            </div>

            <div className="order-item__price">
                {productCount > 0 ? (
                    <>
                        <div className="order-item__price-usd">{usdTotal}</div>
                        <div className="order-item__price-uah">{uahTotal}</div>
                    </>
                ) : (
                    <span className="order-item__no-price">—</span>
                )}
            </div>

            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="order-item__arrow"
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5fb346" strokeWidth="2.5" width="16" height="16">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                className="order-item__delete-btn"
                onClick={handleDelete}
                id={`order-delete-${order.id}`}
                aria-label="Удалить приход"
                title="Удалить"
            >
                <TrashIcon />
            </button>
        </motion.div>
    );
};

export default React.memo(OrderItem);
