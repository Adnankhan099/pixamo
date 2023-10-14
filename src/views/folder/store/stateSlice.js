import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesProductList/state',
    initialState: {
        deleteConfirmation: false,
        selectedProduct: '',
        selectedRows: [],
        selectedRow: [],
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: [...currentState.selectedRows, ...payload],
                }
            }
        },
        removeRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: currentState.selectedRows.filter(
                        (id) => id !== payload
                    ),
                }
            }
        },
    },
})

export const {
    toggleDeleteConfirmation,
    setSelectedProduct,
    setSelectedRow,
    setSelectedRows,
    addRowItem,
    removeRowItem,
} = stateSlice.actions

export default stateSlice.reducer
