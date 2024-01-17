import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status_mod: false,
};

const modalSlice = createSlice({
    name: 'applicationForm',
    initialState: initialState,
    reducers: {
        setOpen(state, action) {
            state.status_mod = action.payload
        }
    }
})

export const {setOpen} = modalSlice.actions;

export default modalSlice.reducer;