import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteProduct, closeProductDeleteModal } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import '../DeleteModal/DeleteModal.css'; // Reuse exactly the same beautiful styling

const ProductDeleteModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { deleteModalProductId, items: productItems } = useSelector((state: RootState) => state.products);
    const orderItems = useSelector((state: RootState) => state.orders.items);

    // Look for the product in products state first, otherwise search inside the orders state
    const product = React.useMemo(() => {
        if (!deleteModalProductId) return null;
        const fromProducts = productItems.find(p => p.id === deleteModalProductId);
        if (fromProducts) return fromProducts;

        for (const order of orderItems) {
            const fromOrder = order.products?.find(p => p.id === deleteModalProductId);
            if (fromOrder) return fromOrder;
        }
        return null;
    }, [deleteModalProductId, productItems, orderItems]);

    const handleDelete = () => {
        if (deleteModalProductId != null) {
            dispatch(deleteProduct(deleteModalProductId));
        }
    };

    return (
        <AnimatePresence>
            {deleteModalProductId != null && product && (
                <>
                    <motion.div
                        className="delete-modal__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeProductDeleteModal())}
                    />
                    <motion.div
                        className="delete-modal"
                        initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-55%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.92, x: "-50%", y: "-55%" }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        id="product-delete-modal"
                    >
                        <button
                            className="delete-modal__close"
                            onClick={() => dispatch(closeProductDeleteModal())}
                            id="product-delete-cancel-x"
                            aria-label="Close"
                        >×</button>

                        <h3 className="delete-modal__title">
                            Вы уверены, что хотите удалить этот продукт?
                        </h3>

                        <div className="delete-modal__product">
                            <span className={`delete-modal__dot delete-modal__dot--${product.isNew === 1 ? 'new' : 'used'}`} />
                            <div className="delete-modal__product-img">
                                <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
                                    <rect x="2" y="2" width="36" height="22" rx="3" stroke="#ccc" strokeWidth="1.5" fill="#f8f8f8" />
                                    <rect x="6" y="5" width="28" height="15" rx="2" fill="#e8e8e8" />
                                    <rect x="14" y="24" width="12" height="3" rx="1" fill="#ddd" />
                                </svg>
                            </div>
                            <div className="delete-modal__product-info">
                                <div className="delete-modal__product-title">{product.title}</div>
                                <div className="delete-modal__product-sn">SN-{product.serialNumber}</div>
                            </div>
                        </div>

                        <div className="delete-modal__actions">
                            <button
                                className="delete-modal__btn-cancel"
                                onClick={() => dispatch(closeProductDeleteModal())}
                                id="product-delete-modal-cancel-btn"
                            >
                                ОТМЕНИТЬ
                            </button>
                            <button
                                className="delete-modal__btn-delete"
                                onClick={handleDelete}
                                id="product-delete-modal-confirm-btn"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                </svg>
                                УДАЛИТЬ
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductDeleteModal;
