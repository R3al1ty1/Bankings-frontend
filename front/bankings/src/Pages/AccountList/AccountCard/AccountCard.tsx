import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Account} from "../../../Types";
import {motion} from "framer-motion"
import {DOMEN, iAccountsMock, requestTime} from "../../../Consts";
import "./AccountCard.css"
import {useToken} from "../../../hooks/useToken";

const AccountCard = ({ account, setAccounts }: { account: Account, setAccounts: Dispatch<Account[]> }) => {

    const {access_token} = useToken()

    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/api/accounts/${account.id}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
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

                <button className="account-delete-button" onClick={onDelete}>Удалить</button>

            </div>

        </motion.div>

    );
}

export default AccountCard;