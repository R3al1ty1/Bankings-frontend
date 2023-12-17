import "./Header.css";
import * as React from 'react';
import ProfileMenu from "./ProfileMenu/ProfileMenu";
// @ts-ignore
import logo from "../../../bank-logo.png"
import {Link} from "react-router-dom";
import {useToken} from "../../hooks/useToken";
import {useAuth} from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {useDraftApplication} from "../../hooks/useDraftApplication";
import axios from "axios";
import {Response} from "../../Types";
import Hamburger from "../../Components/Header/Hamburger/Hamburger";

const Header: React.FC = () => {

    const {access_token, refresh_token} = useToken()

    const {is_authenticated, setUser} = useAuth()

    const {setApplication} = useDraftApplication()

    const fetchApplication = async () => {
        try {

            const response: Response = await axios(`http://localhost:8000/api/applications/draft/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': access_token
                },
            })

            if (response.status != 404)
            {
                setApplication(response.data)
            }

        } catch (error) {


        }
    }

    const auth = async () => {

        try {

            const response: Response = await axios(`http://localhost:8000/api/check/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            })

            if (response.status == 200)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
                    user_name: response.data["name"],
                    user_email: response.data["email"],
                }

                setUser(permissions)
                await fetchApplication()
            }

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                await refreshToken()
            }
        }

    }

    const refreshToken = async () => {
        try {

            console.log("refresh")

            const response: Response = await axios(`http://localhost:8000/api/refresh/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': refresh_token
                },
            })

            if (response.status == 201)
            {
                const permissions = {
                    is_authenticated: true,
                    is_moderator: response.data["is_moderator"],
                    user_id: response.data["user_id"],
                    user_name: response.data["name"],
                    user_email: response.data["email"],
                }

                setUser(permissions)
            }
        } catch (e: any) {
            console.log(e.status);
        }
    }

    useEffect(() => {

        if (!is_authenticated)
        {
            auth()
        }

    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (is_authenticated) {

        return (
            <div className="header-wrapper">
                <div className="header-left">
                    <img src={logo} className="logo" alt="Bank Logo"/>
                    <div>
                        <h1 className="header-title">INK Bank</h1>
                    </div>
                </div>

                <div className="header-links">
                    <Link to="/home" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Главная</span>
                    </Link>

                    <Link to="/home" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Договора</span>
                    </Link>

                    <Link to="/applications" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Заявки</span>
                    </Link>

                    <Link to="/accounts" className="header-menu-link" style={{textDecoration: 'none'}}>
                        <span className="item">Счета</span>
                    </Link>
                </div>

                <ProfileMenu/>
            </div>
        );
    }
    return (
        <div className="header-wrapper">
            <div className="header-left">
                <img src={logo} className="logo" alt="Bank Logo"/>
                <div>
                    <h1 className="header-title">INK Bank</h1>
                </div>
            </div>

            <div className="header-links">
                <Link to="/home" className="header-menu-link" style={{textDecoration: 'none'}}>
                    <span className="item">Главная</span>
                </Link>
            </div>

            <div className={"header-right " + (isOpen ? "open" : "")}>

                <Link to="/auth" className="header-menu-link" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                    <span className="item">Вход</span>
                </Link>

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />


        </div>
    );
};

export default Header;