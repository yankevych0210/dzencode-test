import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { closeAddProductModal, addProduct } from '../../store/slices/productsSlice';
import '../AddOrderModal/AddModal.css';

const AddProductModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAddModalOpen } = useSelector((state: RootState) => state.products);
    const { items: orders } = useSelector((state: RootState) => state.orders);

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Monitors');
    const [orderId, setOrderId] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await dispatch(addProduct({
                title,
                type,
                serialNumber: Math.floor(Math.random() * 10000),
                isNew: 1,
                photo: 'monitor.png',
                specification: 'User specific',
                guarantee: { start: new Date().toISOString(), end: new Date().toISOString() },
                price: [
                    { value: 150, symbol: 'USD', isDefault: 0 },
                    { value: 4500, symbol: 'UAH', isDefault: 1 }
                ],
                order: orderId
            })).unwrap();

            dispatch(closeAddProductModal());
            setTitle('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isAddModalOpen && (
                <>
                    <motion.div
                        className="add-modal__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(closeAddProductModal())}
                    />
                    <motion.div
                        className="add-modal"
                        initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                        <button
                            className="add-modal__close"
                            onClick={() => dispatch(closeAddProductModal())}
                            type="button"
                        >×</button>

                        <div className="add-modal__content">
                            <h3 className="add-modal__title">Добавить продукт</h3>

                            <form onSubmit={handleSubmit} className="add-modal__form">
                                <div className="add-modal__field">
                                    <label className="add-modal__label">Название</label>
                                    <input
                                        type="text"
                                        className="add-modal__input"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="Название продукта"
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="add-modal__row">
                                    <div className="add-modal__field">
                                        <label className="add-modal__label">Тип оборудования</label>
                                        <select
                                            className="add-modal__select"
                                            value={type}
                                            onChange={e => setType(e.target.value)}
                                        >
                                            <option value="Monitors">Мониторы</option>
                                            <option value="Laptops">Ноутбуки</option>
                                            <option value="Phones">Телефоны</option>
                                        </select>
                                    </div>
                                    <div className="add-modal__field">
                                        <label className="add-modal__label">Привязка к приходу</label>
                                        <select
                                            className="add-modal__select"
                                            value={orderId}
                                            onChange={e => setOrderId(Number(e.target.value))}
                                        >
                                            {orders.map(o => (
                                                <option key={o.id} value={o.id}>Order #{o.id} - {o.title.substring(0, 50)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="add-modal__actions">
                            <button
                                type="button"
                                className="add-modal__btn-cancel"
                                onClick={() => dispatch(closeAddProductModal())}
                            >
                                ОТМЕНИТЬ
                            </button>
                            <button
                                type="submit"
                                className="add-modal__btn-submit"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'СОХРАНЕНИЕ...' : 'ДОБАВИТЬ'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddProductModal;
