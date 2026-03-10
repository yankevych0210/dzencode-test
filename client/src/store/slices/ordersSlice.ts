import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
    const res = await axios.get<Order[]>(`${API_URL}/api/orders`);
    return res.data;
});

export const deleteOrderAsync = createAsyncThunk('orders/delete', async (id: number) => {
    await axios.delete(`${API_URL}/api/orders/${id}`);
    return id;
});

interface OrdersState {
    items: Order[];
    selectedOrderId: number | null;
    deleteModalOrderId: number | null;
    isAddModalOpen: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    items: [],
    selectedOrderId: null,
    deleteModalOrderId: null,
    isAddModalOpen: false,
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setSelectedOrder(state, action: PayloadAction<number | null>) {
            state.selectedOrderId = action.payload;
        },
        openDeleteModal(state, action: PayloadAction<number>) {
            state.deleteModalOrderId = action.payload;
        },
        closeDeleteModal(state) {
            state.deleteModalOrderId = null;
        },
        openAddModal(state) {
            state.isAddModalOpen = true;
        },
        closeAddModal(state) {
            state.isAddModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => { state.loading = true; })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch orders';
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(o => o.id !== action.payload);
                if (state.selectedOrderId === action.payload) {
                    state.selectedOrderId = null;
                }
                state.deleteModalOrderId = null;
            });
    }
});

export const { setSelectedOrder, openDeleteModal, closeDeleteModal, openAddModal, closeAddModal } = ordersSlice.actions;
export default ordersSlice.reducer;
