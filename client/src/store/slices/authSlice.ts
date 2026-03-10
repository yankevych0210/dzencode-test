import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('jwt_token'),
    isAuthenticated: !!localStorage.getItem('jwt_token'),
    loading: false,
    error: null,
};

export const loginMock = createAsyncThunk('auth/login', async () => {
    // Simulate API call to /api/login
    return new Promise<{ token: string }>(resolve => {
        setTimeout(() => {
            resolve({ token: 'mock-jwt-token-ey123456789' });
        }, 500);
    });
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('jwt_token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginMock.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginMock.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('jwt_token', action.payload.token);
            })
            .addCase(loginMock.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
