import {Dispatch} from "react";
import {Link} from "react-router-dom";
import {Account} from "../../../Types";
import {motion} from "framer-motion"
import {DOMEN, iAccountsMock, requestTime} from "../../../Consts";
import "./AccountCard.css"
const AccountCard = ({ account, setAccounts }: { account: Account, setAccounts: Dispatch<Account[]> }) => {

    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/api/accounts/${account.number}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime)
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

                {/* <FacultyIcon faculty_id={account.faculty}/> */}

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