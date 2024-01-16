// @ts-ignore
import React, { useEffect, useState } from "react";

import "./OfferInfo.css";
import {Link} from "react-router-dom";
export const HomeInfo = () => {

    useEffect(() => {
        //fetchData()
    }, []);



    return (
        <div className="offers-wrapper">
            <div className="card">
                <h2>Меню</h2>
                <div className="home-link">
                    <Link to="/agreements">
                        <div className="link-text">
                        Договоры
                    </div>
                    </Link>
                </div>
                <div className="home-link">
                    <Link to="/auth/login/">
                        <div className="link-text">
                            Вход
                        </div>
                    </Link>
                </div>
                <div className="home-link">
                    <Link to="/auth/register">
                        <div className="link-text">
                            Регистрация
                        </div>
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeInfo;
