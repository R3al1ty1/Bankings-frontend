import "./ApplicationPage.css"
import {useNavigate} from "react-router-dom";
import {useDraftApplication} from "../../hooks/useDraftApplication";
import AccountCard from "../AccountList/AccountCard/AccountCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {Account} from "Types";

const DraftApplicationPage = () => {
    const navigate = useNavigate()
    const [,setAccounts] = useState<Account[]>(/* initial value */);
    const {is_authenticated, is_moderator} = useAuth()

    const {application, sendApplication, deleteApplication} = useDraftApplication()

    useEffect(() => {
        if (!is_authenticated || is_moderator) {
            navigate("/accounts")
        }
    }, [])

    if (!is_authenticated || is_moderator){
        return
    }

    if (application == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Здесь пока пусто...</h1>
            </div>
        )
    }

    const cards = application.accounts.map(account => (
        <AccountCard account={account} key={account.id} setAccounts={setAccounts} />
    ));


    const handleAdd = async () => {
        await sendApplication()
        navigate("/applications")
    }

    const handleDelete = async () => {
        await deleteApplication()
        navigate("/accounts")
    }

    return (
        <div className="application-page-wrapper">

            <div className="application-draft-wrapper">
                <div className="top">
                    <h3>Заявка</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>

            <div className="draft-buttons-wrapper">

                <button className="draft-button" onClick={handleAdd}>Отправить</button>

                <button className="draft-button" onClick={handleDelete}>Удалить</button>

            </div>


        </div>
    )
}

export default DraftApplicationPage