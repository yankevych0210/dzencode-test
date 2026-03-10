import productsReducer, { setTypeFilter } from '../productsSlice';

// Mock localStorage for tests
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('productsSlice', () => {
    beforeEach(() => localStorageMock.clear());

    it('initial state has empty typeFilter', () => {
        const state = productsReducer(undefined, { type: '@@INIT' });
        expect(state.typeFilter).toBe('');
        expect(state.items).toHaveLength(0);
        expect(state.loading).toBe(false);
    });

    it('setTypeFilter updates the filter', () => {
        const state = productsReducer(undefined, setTypeFilter('Monitors'));
        expect(state.typeFilter).toBe('Monitors');
    });

    it('setTypeFilter persists to localStorage', () => {
        productsReducer(undefined, setTypeFilter('Laptops'));
        const saved = localStorageMock.getItem('inventory_product_type_filter');
        expect(JSON.parse(saved!)).toBe('Laptops');
    });

    it('setTypeFilter can be reset to empty', () => {
        const state1 = productsReducer(undefined, setTypeFilter('Phones'));
        const state2 = productsReducer(state1, setTypeFilter(''));
        expect(state2.typeFilter).toBe('');
    });
});
