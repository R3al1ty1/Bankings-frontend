import {useDispatch, useSelector} from 'react-redux';
import {
    updateApplication
} from "../store/draftApplicationSlice";
import axios from "axios";
import {useToken} from "./useToken";
import {Application} from "Types";

export function useDraftApplication() {

    const {access_token} = useToken()

    const application = useSelector((state: { draftApplication: { application: Application } }) => state.draftApplication.application);

    const dispatch = useDispatch()

    const setApplication = (value: any) => {
        dispatch(updateApplication(value))
    }

    const fetchDraftApplication = async () => {
        const query = ""
        const response = await axios(`http://127.0.0.1:8000/api/accounts/search`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': access_token
            },
            params: {
                query
            }

        })
        const lastItem = response.data[response.data.length - 1];
        console.log("appId", lastItem)
        if (lastItem && lastItem.appId !== undefined) {
            const applicationResponse = await axios.get(`http://127.0.0.1:8000/api/applications/${lastItem.appId}/`);
            setApplication(applicationResponse.data);
        } else {
            setApplication(undefined);
        }
    }
        const addAccountToApplication = async (account_id: number) => {
            const response = await axios(`http://127.0.0.1:8000/api/accounts/${account_id}/post/`, {
                method: "POST",
                headers: {
                    'Authorization': access_token
                },
            })

            if (response.status == 200) {
                setApplication(response.data)
            }
        }

        const saveApplication = async () => {
            try {

                await axios(`http://127.0.0.1:8000/api/applications/${application.id}/update/`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': access_token
                    },
                    data: application
                })

            } catch (e) {
                console.log(e)
            }
        }

        const sendApplication = async () => {

            const response = await axios.put(`http://127.0.0.1:8000/api/app_create_status/${application.id}/put/`,
                {
                    status: 2,
                },
                {
                    headers: {
                        'Authorization': access_token,
                    },

                })

            if (response.status == 200) {
                setApplication(undefined)
            }
        }

        const deleteApplication = async () => {

            const response = await axios(`http://127.0.0.1:8000/api/applications/${application.id}/delete/`, {
                method: "DELETE",
                headers: {
                    'Authorization': access_token
                }
            })

            if (response.status == 200) {
                setApplication(undefined)
            }
        }

        const deleteApplicationFromAccount = async (account_id: number) => {
            const response = await axios(`http://127.0.0.1:8000/api/apps_accs/${account_id}/${application.id}/delete/`, {
                method: "DELETE",
                headers: {
                    'Authorization': access_token
                }
            })

            if (response.status == 200) {
                setApplication(response.data)
            }
        }

        return {
            application,
            setApplication,
            addAccountToApplication,
            saveApplication,
            sendApplication,
            deleteApplication,
            deleteApplicationFromAccount,
            fetchDraftApplication
        };
    }
