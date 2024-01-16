import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from "../store/applicationFormSlice";
import {useToken} from "../hooks/useToken";
import axios from "axios";
import {updateApplication} from "../store/selectedApplicationSlice";

export function useApplicationForm() {
    const isOpen = useSelector((state: any) => state.applicationForm.isOpen);

    const dispatch = useDispatch()

    const openForm = () => {
        dispatch(setOpen(true))
    }

    const closeForm = () => {
        dispatch(setOpen(false))
    }

    const setApplication = (value: any) => {
        dispatch(updateApplication(value))
    }
    const acceptApplication = async (application_id: number) => {

        const {access_token} = useToken()

        const formData = new FormData()

        formData.append("status", "3")

        const response = await axios.put(`http://localhost:8000/api/app_mod_status/${application_id}/put/`, { status: 3 }, {
            headers: {
                'Authorization': access_token
            }
        });

        if (response.status == 200) {
            setApplication(response.data)
        }
    }

    const dismissApplication = async (application_id: number) => {

        const {access_token} = useToken()

        const formData = new FormData()

        formData.append("status", "4")

        const response = await axios.put(`http://localhost:8000/api/app_mod_status/${application_id}/put/`, { status: 4 }, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            setApplication(response.data)
        }
    }


    return {
        isOpen,
        openForm,
        setApplication,
        acceptApplication,
        dismissApplication,
        closeForm
    };
}