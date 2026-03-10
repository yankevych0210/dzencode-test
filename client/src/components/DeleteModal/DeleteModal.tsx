import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteOrderAsync, closeDeleteModal } from '../../store/slices/ordersSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import './DeleteModal.css';

const DeleteModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { deleteModalOrderId, items } = useSelector((state: RootState) => state.orders);

    const order = items.find(o => o.id === deleteModalOrderId);
    const firstProduct = order?.products?.[0];

    const handleDelete = () => {
        if (deleteModalOrderId != null) {
            dispatch(deleteOrderAsync(deleteModalOrderId));
        }
    };

    return (
        <AnimatePresence>
            {deleteModalOrderId != null && (
                <>
                    <motion.div
                        className="delete-modal__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeDeleteModal())}
                    />
                    <motion.div
                        className="delete-modal"
                        initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-55%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.92, x: "-50%", y: "-55%" }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        id="delete-modal"
                    >
                        <button
                            className="delete-modal__close"
                            onClick={() => dispatch(closeDeleteModal())}
                            id="delete-modal-cancel-x"
                            aria-label="Close"
                        >×</button>

                        <h3 className="delete-modal__title">
                            Вы уверены, что хотите удалить этот приход?
                        </h3>

                        {firstProduct && (
                            <div className="delete-modal__product">
                                <span className={`delete-modal__dot delete-modal__dot--${firstProduct.isNew === 1 ? 'new' : 'used'}`} />
                                <div className="delete-modal__product-img">
                                    <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
                                        <rect x="2" y="2" width="36" height="22" rx="3" stroke="#ccc" strokeWidth="1.5" fill="#f8f8f8" />
                                        <rect x="6" y="5" width="28" height="15" rx="2" fill="#e8e8e8" />
                                        <rect x="14" y="24" width="12" height="3" rx="1" fill="#ddd" />
                                    </svg>
                                </div>
                                <div className="delete-modal__product-info">
                                    <div className="delete-modal__product-title">{firstProduct.title}</div>
                                    <div className="delete-modal__product-sn">SN-{firstProduct.serialNumber}</div>
                                </div>
                            </div>
                        )}

                        <div className="delete-modal__actions">
                            <button
                                className="delete-modal__btn-cancel"
                                onClick={() => dispatch(closeDeleteModal())}
                                id="delete-modal-cancel-btn"
                            >
                                ОТМЕНИТЬ
                            </button>
                            <button
                                className="delete-modal__btn-delete"
                                onClick={handleDelete}
                                id="delete-modal-confirm-btn"
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

export default DeleteModal;
