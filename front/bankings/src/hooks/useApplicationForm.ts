import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from "../store/applicationFormSlice";

export function useApplicationForm() {
    const isOpen = useSelector((state: any) => state.applicationForm.isOpen);

    const dispatch = useDispatch()

    const openForm = () => {
        dispatch(setOpen(true))
    }

    const closeForm = () => {
        dispatch(setOpen(false))
    }

    return {
        isOpen,
        openForm,
        closeForm
    };
}