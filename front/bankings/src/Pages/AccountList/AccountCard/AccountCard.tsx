import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Account} from "../../../Types";
import {motion} from "framer-motion"
import {DOMEN, iAccountsMock, requestTime} from "../../../Consts";
import "./AccountCard.css"
import GeneralButton from "../../../Components/GeneralButton/GeneralButton";
import axios from "axios";
import {accountAddedMessage, accountAlreadyAddedMessage, requestErrorMessage} from "../../../Toasts/Toasts";
import {useAuth} from "../../../hooks/useAuth";
import {useToken} from "../../../hooks/useToken";
import {useDraftApplication} from "../../../hooks/useDraftApplication";
import { AxiosResponse } from 'axios';

const AccountCard = ({ account, setAccounts }: { account: Account, setAccounts: Dispatch<Account[]> }) => {

    const {access_token} = useToken()

    const {is_authenticated} = useAuth()

    const {setApplication} = useDraftApplication()

    const addToApplication = async () => {

        try {
            const response: AxiosResponse<any> = await axios(`${DOMEN}/api/accounts/${account.id}/add_to_application/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (response.status === 200) {
                accountAddedMessage(account.name, response.data["id"])
                setApplication(response.data)
            }

        } catch (e: any)
        {
            if (e.response.status == 409) {
                accountAlreadyAddedMessage()
            } else {
                requestErrorMessage()
            }
        }
    }


    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/api/accounts/${account.number}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': access_token
                },
            });

            if (!response.ok){
                deleteMockAccount()
            }

            const accounts: Account[] = await response.json()

            setAccounts(accounts)

        } catch (e) {

            deleteMockAccount()

        }
    }

    const deleteMockAccount = () => {

        account.available = false

        setAccounts(iAccountsMock.filter(account => account.available == true))

    }

    return (
        <motion.div
            layout
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{scale: 1.1}}
            className="account"
            key={account.id}>

            <div className="top-container">
            </div>

            <div className="center-container">

                <span className="account-name">{account.name}</span>

            </div>

            <div className="bottom-container">

                <Link to={`/accounts/${account.id}`}>
                    <button className="account-info-button">Открыть</button>
                </Link>

                {is_authenticated && <GeneralButton text="Выбрать" onClick={addToApplication} /> }

                <button className="account-delete-button" onClick={onDelete}>Удалить</button>

            </div>

        </motion.div>

    );
}

export default AccountCard;