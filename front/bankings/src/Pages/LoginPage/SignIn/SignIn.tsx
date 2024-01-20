import "../Login.css"
import {FaLock} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Response} from "../../../Types";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {errorMessage} from "../../../Toasts/Toasts";
import {useToken} from "../../../hooks/useToken";
import {useAuth} from "../../../hooks/useAuth";
import Cookies from "universal-cookie";

const SignIn = () => {

    const navigate = useNavigate()

    const { setAccessToken} = useToken()
    const { setUser } = useAuth()

    const login = async (formData: any) => {

        try {
            const response:Response = await axios(`http://127.0.0.1:8000/api/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: formData as FormData
            })

            setAccessToken(response.data['access_token'])

            const permissions = {
                is_authenticated: true,
                is_moderator: response.data["is_moderator"],
                user_id: response.data["user_id"],
                user_name: response.data["full_name"],
                user_email: response.data["email"]
            }

            setUser(permissions)
            localStorage.setItem('userToken', response.data["access_token"])
            localStorage.setItem('userRole', response.data["is_moderator"])
            localStorage.setItem("requestStatus", '')
            const cookies = new Cookies();
            cookies.set('access_token', response.data['access_token'], { path: '/', maxAge: 604800 }); // maxAge указывает срок действия куки в секундах (в данном случае, 7 дней)

            navigate("/accounts/");

            //successMessage(response.data["name"])

        } catch {
            errorMessage()
        }
    }

    const handleSubmit = async (e: any) => {

        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        await login(formData)
    }


    return (
        <div className="auth-container">

            <div className="header">

                <div className="text">
                    Вход
                </div>

            </div>

            <form className="inputs" action="POST" onSubmit={handleSubmit}>

                <div className="input">
                    <GrMail />
                    <input type="email" name="email" placeholder="Почта" required/>
                </div>

                <div className="input">
                    <FaLock />
                    <input type="password" name="password"  placeholder="Пароль" required/>
                </div>


                <div className="sign-up-link-container">
                    <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                        <span> Ещё нет аккаунта? </span>
                    </Link>
                </div>

                <button className="login-button" onClick={login}>Войти</button>

            </form>

        </div>
    )
}

export default SignIn;