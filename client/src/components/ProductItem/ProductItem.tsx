import React from 'react';
import { Product, Order } from '../../types';
import { formatShort, formatLong } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openProductDeleteModal } from '../../store/slices/productsSlice';
import './ProductItem.css';

interface ProductItemProps {
    product: Product;
    order?: Order;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, order }) => {
    const dispatch = useAppDispatch();
    const usdPrice = formatPrice(product.price, 'USD');
    const uahPrice = formatPrice(product.price, 'UAH');

    const handleDelete = () => {
        dispatch(openProductDeleteModal(product.id));
    };

    return (
        <div className="product-item" id={`product-item-${product.id}`}>
            <div className="product-item__expand">
                <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="14" height="14">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>

            <span className={`product-item__dot product-item__dot--${product.isNew === 1 ? 'new' : 'used'}`} />

            <div className="product-item__img">
                <svg viewBox="0 0 40 30" width="40" height="30" fill="none">
                    <rect x="2" y="2" width="36" height="22" rx="3" stroke="#ccc" strokeWidth="1.5" fill="#f8f8f8" />
                    <rect x="6" y="5" width="28" height="15" rx="2" fill="#e8e8e8" />
                    <rect x="14" y="24" width="12" height="3" rx="1" fill="#ddd" />
                </svg>
            </div>

            <div className="product-item__info">
                <div className="product-item__title">{product.title}</div>
                <div className="product-item__sn">SN-{product.serialNumber}</div>
            </div>

            <div className="product-item__status">
                {product.isNew === 1 ? (
                    <span className="product-item__status--free">свободен</span>
                ) : (
                    <span className="product-item__status--repair">В ремонте</span>
                )}
            </div>

            <div className="product-item__guarantee">
                <div className="product-item__guarantee-row">
                    <span className="product-item__guarantee-label">с</span>
                    <span>{formatShort(product.guarantee.start)}</span>
                </div>
                <div className="product-item__guarantee-row">
                    <span className="product-item__guarantee-label">по</span>
                    <span>{formatLong(product.guarantee.end)}</span>
                </div>
            </div>

            <div className="product-item__condition">
                {product.isNew === 1 ? (
                    <span className="product-item__condition--new">новый</span>
                ) : (
                    <span className="product-item__condition--used">б/у</span>
                )}
            </div>

            <div className="product-item__price">
                <div className="product-item__price-usd">{usdPrice}</div>
                <div className="product-item__price-uah">{uahPrice}</div>
            </div>

            <div className="product-item__group">
                {order ? (
                    <span className="product-item__group-text">Длинное предлинное длиннющее название группы</span>
                ) : '—'}
            </div>

            <div className="product-item__order">
                {order ? (
                    <span className="product-item__order-link">{order.title}</span>
                ) : '—'}
            </div>

            <div className="product-item__date">
                <div className="product-item__date-short">{formatShort(product.date)}</div>
            </div>

            <button
                className="product-item__delete"
                aria-label="Delete product"
                id={`product-delete-${product.id}`}
                onClick={handleDelete}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                </svg>
            </button>
        </div>
    );
};

export default React.memo(ProductItem);
