import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { storage } from '../utils/storage';

const resources = {
    uk: {
        translation: {
            orders: 'Прихід',
            products: 'Продукти',
            groups: 'Групи',
            users: 'Користувачі',
            settings: 'Налаштування',
            activeSessions: 'активних сесій',
            deleteOrder: 'Видалити прихід',
            confirmDelete: 'Ви впевнені, що хочете видалити цей прихід?',
            cancel: 'ВІДМІНИТИ',
            delete: 'ВИДАЛИТИ',
            filterByType: 'Тип:',
            allTypes: 'Всі типи',
            addProduct: 'Додати продукт',
            isNew: 'новий',
            isUsed: 'б/у',
            free: 'Свободен',
            inRepair: 'В ремонті',
            products_count: 'Продуктів',
            search: 'Пошук',
        },
    },
    en: {
        translation: {
            orders: 'Orders',
            products: 'Products',
            groups: 'Groups',
            users: 'Users',
            settings: 'Settings',
            activeSessions: 'active sessions',
            deleteOrder: 'Delete Order',
            confirmDelete: 'Are you sure you want to delete this order?',
            cancel: 'CANCEL',
            delete: 'DELETE',
            filterByType: 'Type:',
            allTypes: 'All types',
            addProduct: 'Add product',
            isNew: 'new',
            isUsed: 'used',
            free: 'Free',
            inRepair: 'In repair',
            products_count: 'Products',
            search: 'Search',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storage.get('lang', 'uk'),
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
