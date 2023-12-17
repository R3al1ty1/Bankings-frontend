import {useDispatch, useSelector} from 'react-redux';
import {pageChanged, pageSizeChanged, totalCountChanged} from "../store/applicationsSlice";

export function useApplications() {
    const queryPageIndex = useSelector((state: any) => state.applications.queryPageIndex);
    const queryPageSize = useSelector((state: any) => state.applications.queryPageSize);
    const totalCount = useSelector((state: any) => state.applications.totalCount);

    const dispatch = useDispatch()

    const setApplicationsPage = (value: any) => {
        dispatch(pageChanged(value))
    }

    const setApplicationsPageSize = (value: any) => {
        dispatch(pageSizeChanged(value))
    }

    const setApplicationsPageTotalCount = (value: any) => {
        dispatch(totalCountChanged(value))
    }

    return {
        queryPageIndex,
        queryPageSize,
        totalCount,
        setApplications: {
            setApplicationsPage,
            setApplicationsPageSize,
            setApplicationsPageTotalCount
        }
    };
}