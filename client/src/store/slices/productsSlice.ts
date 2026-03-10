import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types';
import { storage } from '../../utils/storage';
import { fetchOrders } from './ordersSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const { data } = await axios.get<Product[]>(`${API_URL}/api/products`);
    return data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: number, { dispatch }) => {
    await axios.delete(`${API_URL}/api/products/${id}`);
    dispatch(fetchOrders() as any);
    return id;
});

export const addProduct = createAsyncThunk('products/add', async (productData: Partial<Product>, { dispatch }) => {
    const { data } = await axios.post<Product>(`${API_URL}/api/products`, productData);

    // Dispatch fetchOrders to re-sync the relational nested data
    dispatch(fetchOrders() as any);

    return data;
});

interface ProductsState {
    items: Product[];
    typeFilter: string;
    loading: boolean;
    error: string | null;
    deleteModalProductId: number | null;
    isAddModalOpen: boolean;
}

const initialState: ProductsState = {
    items: [],
    // Restore last used filter from localStorage so it persists across reloads
    typeFilter: storage.get<string>('product_type_filter', ''),
    loading: false,
    error: null,
    deleteModalProductId: null,
    isAddModalOpen: false,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTypeFilter(state, action: PayloadAction<string>) {
            state.typeFilter = action.payload;
            storage.set('product_type_filter', action.payload);
        },
        openProductDeleteModal(state, action: PayloadAction<number>) {
            state.deleteModalProductId = action.payload;
        },
        closeProductDeleteModal(state) {
            state.deleteModalProductId = null;
        },
        openAddProductModal(state) {
            state.isAddModalOpen = true;
        },
        closeAddProductModal(state) {
            state.isAddModalOpen = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => { state.loading = true; state.error = null; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch products';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
                state.deleteModalProductId = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export const { setTypeFilter, openProductDeleteModal, closeProductDeleteModal, openAddProductModal, closeAddProductModal } = productsSlice.actions;
export default productsSlice.reducer;
