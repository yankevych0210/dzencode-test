import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '../../types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openProductDeleteModal, openAddProductModal } from '../../store/slices/productsSlice';
import { setSelectedOrder } from '../../store/slices/ordersSlice';
import './OrderDetail.css';

interface OrderDetailProps {
    order: Order | null;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
    const dispatch = useAppDispatch();

    // Explicitly filter products to this order's ID because the mock data getter returns ALL products
    const orderProducts = order?.products?.filter(p => p.order === order.id) ?? [];

    return (
        <AnimatePresence mode="wait">
            {order && (
                <motion.div
                    className="order-detail"
                    key={order.id}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <button
                        className="order-detail__close"
                        onClick={() => dispatch(setSelectedOrder(null))}
                        id="order-detail-close"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <h2 className="order-detail__title">{order.title}</h2>

                    <div className="order-detail__add" onClick={() => dispatch(openAddProductModal())} role="button" aria-label="Add product">
                        <span className="order-detail__add-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <circle cx="12" cy="12" r="12" fill="#5fb346" />
                                <path d="M12 7v10M7 12h10" stroke="#fff" strokeWidth="2.5" fill="none" />
                            </svg>
                        </span>
                        <span className="order-detail__add-text">Добавить продукт</span>
                    </div>

                    <div className="order-detail__products">
                        {orderProducts.length > 0 ? (
                            orderProducts.map(product => (
                                <div key={product.id} className="order-detail__product" id={`order-detail-product-${product.id}`}>
                                    <span className={`order-detail__product-dot order-detail__product-dot--${product.isNew === 1 ? 'new' : 'used'}`} />
                                    <div className="order-detail__product-img">
                                        <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
                                            <rect x="2" y="2" width="36" height="22" rx="3" stroke="#ccc" strokeWidth="1.5" fill="#f8f8f8" />
                                            <rect x="6" y="5" width="28" height="15" rx="2" fill="#e8e8e8" />
                                            <rect x="14" y="24" width="12" height="3" rx="1" fill="#ddd" />
                                        </svg>
                                    </div>
                                    <div className="order-detail__product-info">
                                        <div className="order-detail__product-title">{product.title}</div>
                                        <div className="order-detail__product-sn">SN-{product.serialNumber}</div>
                                    </div>
                                    <div className="order-detail__product-status">
                                        {product.isNew === 1 ? (
                                            <span className="order-detail__product-status--free">Свободен</span>
                                        ) : (
                                            <span className="order-detail__product-status--repair">В ремонте</span>
                                        )}
                                    </div>
                                    <button
                                        className="order-detail__product-delete"
                                        aria-label="Remove product"
                                        onClick={() => dispatch(openProductDeleteModal(product.id))}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" width="16" height="16">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14H6L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4h6v2" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="order-detail__empty">Нет продуктов</p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OrderDetail;
