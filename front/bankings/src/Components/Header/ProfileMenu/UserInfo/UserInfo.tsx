import "./UserInfo.css"
import {useAuth} from "../../../../hooks/useAuth";
import {ImExit} from "react-icons/im";
// @ts-ignore
import user from "./user.png"
import {useNavigate } from "react-router-dom";
import {logOutMessage} from "../../../../Toasts/Toasts";
import {useToken} from "../../../../hooks/useToken";
import {useDraftApplication} from "../../../../hooks/useDraftApplication";
import {useModal} from "../../../../hooks/useModal";

const UserInfo = () => {

    const navigate = useNavigate()

    const {is_moderator, full_name, user_email, logOut} = useAuth()

    const {resetTokens} = useToken()

    const {application} = useDraftApplication()

    const {modalRef, buttonRef, isOpen, setIsOpen} = useModal()


    const deleteLastApplication = async () => {
        console.log(application)
    }

    const doLogOut = () => {
        deleteLastApplication()

        logOut()
        resetTokens()
        logOutMessage()
        navigate("/agreements")
    }

    return (
        <div>
            <div ref={buttonRef}>
                <img src={user} className="user-avatar" onClick={() => setIsOpen(!isOpen)} />
            </div>

            <div className={"user-info-wrapper " + (isOpen ? "open" : "")} ref={modalRef}>
                <span>Имя: {full_name}</span>
                <span>Почта: {user_email}</span>
                <span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

                <button onClick={doLogOut}>
                    Выйти
                    <ImExit />
                </button>
            </div>

        </div>
    )
}

export default UserInfo;