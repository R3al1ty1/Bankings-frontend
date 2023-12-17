import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    accounts: [],
    query: ""
};

const modalSlice = createSlice({
    name: 'accountFilters',
    initialState: initialState,
    reducers: {
        updateAccounts(state, action) {
            state.accounts = action.payload
        },

        updateQuery(state, action) {
            state.query = action.payload
        }
    }
})

export const {updateAccounts, updateQuery} = modalSlice.actions;

export default modalSlice.reducer;