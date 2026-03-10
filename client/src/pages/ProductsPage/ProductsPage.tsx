import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProducts, setTypeFilter, openAddProductModal } from '../../store/slices/productsSlice';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ProductItem from '../../components/ProductItem/ProductItem';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, typeFilter, loading } = useSelector((state: RootState) => state.products);
    const orders = useSelector((state: RootState) => state.orders.items);
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery.toLowerCase());
    const [specFilter, setSpecFilter] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchOrders());
    }, [dispatch]);

    const productTypes = useMemo(() => Array.from(new Set(items.map(p => p.type))), [items]);
    const specifications = useMemo(() => Array.from(new Set(items.map(p => p.specification).filter(Boolean))), [items]);

    const filtered = useMemo(() => items
        .filter(p => !typeFilter || p.type === typeFilter)
        .filter(p => !specFilter || p.specification === specFilter)
        .filter(p => {
            if (!searchQuery) return true;
            return p.title.toLowerCase().includes(searchQuery) ||
                p.serialNumber.toString().includes(searchQuery);
        }),
        [items, typeFilter, specFilter, searchQuery]);

    const getOrder = (orderId: number) => orders.find(o => o.id === orderId);

    return (
        <div className="products-page">
            <div className="products-page__header">
                <button
                    className="products-page__add-btn"
                    aria-label="Add product"
                    style={{ marginRight: 16 }}
                    onClick={() => dispatch(openAddProductModal())}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5">
                        <line x1="12" y1="4" x2="12" y2="20" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                    </svg>
                </button>
                <h1 className="products-page__title">Продукты / {filtered.length}</h1>
                <div className="products-page__filters">
                    <label className="products-page__filter-label">Тип:</label>
                    <select
                        className="products-page__filter-select"
                        value={typeFilter}
                        onChange={e => dispatch(setTypeFilter(e.target.value))}
                        id="product-type-filter"
                    >
                        <option value="">Все типы</option>
                        {productTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>

                    <label className="products-page__filter-label">Спецификация:</label>
                    <select
                        className="products-page__filter-select"
                        value={specFilter}
                        onChange={e => setSpecFilter(e.target.value)}
                        id="product-spec-filter"
                    >
                        <option value="">Все</option>
                        {specifications.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && (
                <div className="products-page__loading">
                    <div className="products-page__spinner" />
                </div>
            )}

            <div className="products-page__list">
                {filtered.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        order={getOrder(product.order)}
                    />
                ))}
                {!loading && filtered.length === 0 && (
                    <p className="products-page__empty">Нет продуктов</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
