import {configureStore} from "@reduxjs/toolkit";

import accountReducer from "./selectedAccountSlice"
import draftApplicationReducer from "./draftApplicationSlice"
import selectedApplicationReducer from "./selectedApplicationSlice"
import authReducer from "./authSlice"
import applicationFormReducer from "./applicationFormSlice"
import applicationsReducer from "./applicationsSlice"
import accountFilters from "./accountFiltersSlice"

export default configureStore({
    reducer: {
        selectedAccount: accountReducer,
        accountFilters: accountFilters,
        draftApplication: draftApplicationReducer,
        selectedApplication: selectedApplicationReducer,
        applications: applicationsReducer,
        user: authReducer,
        applicationForm: applicationFormReducer
    }
});