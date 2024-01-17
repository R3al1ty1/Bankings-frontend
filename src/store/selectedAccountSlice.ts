import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    account: undefined,
};

const selectedAccountSlice = createSlice({
    name: 'selectedAccount',
    initialState: initialState,
    reducers: {
        updateAccount(state, action) {
            state.account = action.payload
        }
    }
})

export const {updateAccount} = selectedAccountSlice.actions;

export default selectedAccountSlice.reducer;