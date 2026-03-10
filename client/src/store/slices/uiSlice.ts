import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    searchQuery: string;
    isMobileMenuOpen: boolean;
}

const initialState: UiState = {
    searchQuery: '',
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        toggleMobileMenu(state) {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu(state) {
            state.isMobileMenuOpen = false;
        }
    },
});

export const { setSearchQuery, toggleMobileMenu, closeMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
