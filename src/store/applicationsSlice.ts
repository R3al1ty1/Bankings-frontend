import {createSlice} from "@reduxjs/toolkit"

const initialState= {
    queryPageIndex: 0,
    queryPageSize: 5,
    totalCount: 0,
};

const applicationsSlice = createSlice({
    name: 'accounts',
    initialState: initialState,
    reducers: {
        pageChanged(state, action) {
            state.queryPageIndex = action.payload
        },
        pageSizeChanged(state, action) {
            state.queryPageSize = action.payload
        },
        totalCountChanged(state, action) {
            state.totalCount = action.payload
        }
    }
})

export const {pageChanged, pageSizeChanged, totalCountChanged} = applicationsSlice.actions;

export default applicationsSlice.reducer;