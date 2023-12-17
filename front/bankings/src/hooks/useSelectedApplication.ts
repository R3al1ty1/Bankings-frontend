import {useDispatch, useSelector} from 'react-redux';
import {updateApplication} from "../store/selectedApplicationSlice";

export function useSelectedApplication() {
    const application = useSelector((state: any) => state.selectedApplication.application);

    const dispatch = useDispatch()

    const setApplication = (value: any) => {
        dispatch(updateApplication(value))
    }

    return {
        application,
        setApplication
    };
}