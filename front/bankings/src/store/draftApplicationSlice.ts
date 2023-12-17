import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    application: undefined
};

const draftApplicationSlice = createSlice({
    name: 'draftApplication',
    initialState: initialState,
    reducers: {
        updateApplication(state, action) {
            state.application = action.payload
        }
    }
})

export const {updateApplication} = draftApplicationSlice.actions;

export default draftApplicationSlice.reducer;