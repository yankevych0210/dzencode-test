import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from '../../store/slices/ordersSlice';
import uiReducer from '../../store/slices/uiSlice';
import OrdersPage from './OrdersPage';

// Mock the Recharts and Framer Motion elements to avoid complex drawing in JSDOM
jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    BarChart: () => <div>BarChart Mock</div>,
    Bar: () => <div />,
    XAxis: () => <div />,
    YAxis: () => <div />,
    Tooltip: () => <div />,
    CartesianGrid: () => <div />,
    Legend: () => <div />
}));

jest.mock('../../components/OrdersChart/OrdersChart', () => () => <div data-testid="orders-chart-mock">Chart</div>);

jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

jest.mock('date-fns/locale', () => ({
    uk: {}
}));

jest.mock('date-fns', () => ({
    format: () => '01/01/2000'
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: 'uk', changeLanguage: jest.fn() }
    })
}));

jest.mock('../../hooks/useAppDispatch', () => ({
    useAppDispatch: () => jest.fn()
}));

const renderWithStore = (component: React.ReactElement, initialState: any) => {
    const store = configureStore({
        reducer: {
            orders: ordersReducer,
            ui: uiReducer
        },
        preloadedState: {
            orders: initialState
        }
    });
    return render(<Provider store={store}>{component}</Provider>);
};

describe('OrdersPage Integration Test', () => {
    it('renders the loading spinner when loading is true', () => {
        renderWithStore(<OrdersPage />, {
            items: [],
            loading: true,
            error: null,
            selectedOrderId: null,
            isDeleteModalOpen: false,
            orderToDelete: null
        });

        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('renders empty message when no orders exist', () => {
        renderWithStore(<OrdersPage />, {
            items: [],
            loading: false,
            error: null,
            selectedOrderId: null,
            isDeleteModalOpen: false,
            orderToDelete: null
        });

        expect(screen.getByText('Нет приходов. Нажмите «+» чтобы добавить.')).toBeInTheDocument();
    });

    it('renders a list of orders', () => {
        const mockOrders = [
            { id: 1, title: 'Order 1', date: '2017-06-29', description: '', products: [] },
            { id: 2, title: 'Order 2', date: '2017-06-30', description: '', products: [] }
        ];

        renderWithStore(<OrdersPage />, {
            items: mockOrders,
            loading: false,
            error: null,
            selectedOrderId: null,
            isDeleteModalOpen: false,
            orderToDelete: null
        });

        expect(screen.getByText('Order 1')).toBeInTheDocument();
        expect(screen.getByText('Order 2')).toBeInTheDocument();
        expect(screen.getByText(/Приходы \//)).toBeInTheDocument();
    });
});
