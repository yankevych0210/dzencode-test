import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { closeAddModal, addOrderAsync } from '../../store/slices/ordersSlice';
import './AddModal.css';

const AddOrderModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAddModalOpen } = useSelector((state: RootState) => state.orders);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await dispatch(addOrderAsync({ title, description })).unwrap();
            dispatch(closeAddModal());
            setTitle('');
            setDescription('');
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
                        onClick={() => dispatch(closeAddModal())}
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
                            onClick={() => dispatch(closeAddModal())}
                            type="button"
                        >×</button>

                        <div className="add-modal__content">
                            <h3 className="add-modal__title">Добавить приход</h3>

                            <form onSubmit={handleSubmit} className="add-modal__form">
                                <div className="add-modal__field">
                                    <label className="add-modal__label">Название</label>
                                    <input
                                        type="text"
                                        className="add-modal__input"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="Введите название"
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="add-modal__field">
                                    <label className="add-modal__label">Описание</label>
                                    <textarea
                                        className="add-modal__textarea"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder="Описание прихода"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="add-modal__actions">
                            <button
                                type="button"
                                className="add-modal__btn-cancel"
                                onClick={() => dispatch(closeAddModal())}
                            >
                                ОТМЕНИТЬ
                            </button>
                            <button
                                type="submit"
                                className="add-modal__btn-submit"
                                disabled={loading}
                                onClick={handleSubmit}
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

export default AddOrderModal;
