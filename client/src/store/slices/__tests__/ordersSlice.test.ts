import ordersReducer, {
    setSelectedOrder,
    openDeleteModal,
    closeDeleteModal,
} from '../ordersSlice';

const mockOrder = {
    id: 1,
    title: 'Test Order',
    date: '2017-06-29 12:09:33',
    description: 'Test desc',
    products: [],
};

describe('ordersSlice', () => {
    const initialState = {
        items: [mockOrder],
        selectedOrderId: null,
        deleteModalOrderId: null,
        loading: false,
        error: null,
    };

    it('should return initial state', () => {
        const state = ordersReducer(undefined, { type: '@@INIT' });
        expect(state.selectedOrderId).toBeNull();
        expect(state.deleteModalOrderId).toBeNull();
        expect(state.loading).toBe(false);
    });

    it('setSelectedOrder sets the selected order id', () => {
        const state = ordersReducer(initialState, setSelectedOrder(1));
        expect(state.selectedOrderId).toBe(1);
    });

    it('setSelectedOrder can deselect (null)', () => {
        const state = ordersReducer(
            { ...initialState, selectedOrderId: 1 },
            setSelectedOrder(null)
        );
        expect(state.selectedOrderId).toBeNull();
    });

    it('openDeleteModal sets deleteModalOrderId', () => {
        const state = ordersReducer(initialState, openDeleteModal(1));
        expect(state.deleteModalOrderId).toBe(1);
    });

    it('closeDeleteModal clears deleteModalOrderId', () => {
        const state = ordersReducer(
            { ...initialState, deleteModalOrderId: 1 },
            closeDeleteModal()
        );
        expect(state.deleteModalOrderId).toBeNull();
    });
});
