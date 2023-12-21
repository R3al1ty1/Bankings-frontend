import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";
import {Response} from "../Types";
import axios from "axios";
import {useToken} from "./useToken";

export function useAuth() {
    const userState = useSelector((state: any) => state.user) || {};
    console.log('User State:', userState);

    const { is_authenticated, is_moderator, user_id, user_name, user_email } = userState;
    console.log('is_moderator:', is_moderator);

    const dispatch = useDispatch()

    const { access_token } = useToken()

    const setUser = (value: any) => {
        dispatch(updateUser(value))
    }

    const sendRequest = async() => {

        try {

            const response: Response = await axios(`http://localhost:8000/api/logout/`, {
                method: "POST",
                headers: {
                    'authorization': `${access_token}`
                }
            })

            if (response.status == 200)
            {
                console.log(response.data)
            }

        } catch (error) {

        }
    }

    const logOut = async () => {

        sendRequest()

        dispatch(cleanUser())
    }


    return {
        is_authenticated,
        is_moderator,
        user_id,
        user_name,
        user_email,
        setUser,
        logOut
    };
}