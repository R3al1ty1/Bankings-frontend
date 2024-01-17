import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    application: undefined
};

const selectedApplicationSlice = createSlice({
    name: 'selectedApplication',
    initialState: initialState,
    reducers: {
        updateApplication(state, action) {
            state.application = action.payload
        }
    }
})

export const {updateApplication} = selectedApplicationSlice.actions;

export default selectedApplicationSlice.reducer;