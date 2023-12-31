import React, { useState } from "react";
import axios from "axios";
import "./AccountCreate.css";
import DropdownMenu from "../../../Components/DropdownMenu/DropdownMenu";
import { Link } from 'react-router-dom';
import {useToken} from "../../../hooks/useToken";

const AddAccountPage: React.FC = () => {
    const {access_token} = useToken();

    interface AccountTypeData {
        card: {
            cardName: string,
            firstName: string,
            lastName: string
        };
        credit: {
            creditName: string,
            summ: string;
            creditPurpose: string;
        };
        deposit: {
            depositName: string
            summ: string;
            depDays: string;
        };
        save: {
            saveName: string;
        };
    }

    interface Card {
        id: number;
        name: string;
    }

    const cards = [
        { id: 1, name: "INK No Limits" },
        { id: 2, name: "INK Limited" },
    ];

    const currency = [
        { id: 1, name: "₽" },
        { id: 2, name: "$" },
        { id: 3, name: "€" },
    ]

    const credits = [
        { id: 1, name: "INK Возможности" },
    ]

    const deposits = [
        { id: 1, name: "Выгодный" },
    ]

    const saves = [
        { id: 1, name: "INK Копилка" },
    ]

    const days = [
        { id: 1, name: "90" },
        { id: 2, name: "180" },
        { id: 3, name: "365" },
    ]

    const purpose = [
        { id: 1, name: "Потребительский" },
        { id: 2, name: "Бизнес" },
        { id: 3, name: "Ипотека" },
    ]
    const getNameById = (cards: Card[], id: number): string => {
        const foundCard = cards.find(card => card.id === id);
        return foundCard ? foundCard.name : '';
    };

    const currentPath = window.location.pathname;
    const accType = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const handleSubmit = async () => {
        const firstName = selectedFrst;
        const lastName = selectedScnd;
        const cardName = getNameById(cards, selectedCard);
        const creditName = getNameById(credits, selectedCard);
        const depositName = getNameById(deposits, selectedCard);
        const saveName = getNameById(saves, selectedCard);
        const summ = selectedInput;
        const currencyName = getNameById(currency, selectedCurrency);
        const creditPurpose = getNameById(purpose, selectedPurpose);
        const depDays = getNameById(days, selectedDays);

        const accountTypeData: AccountTypeData = {
            "card": {
                cardName: cardName,
                firstName: firstName,
                lastName: lastName
            },
            "credit": {
                creditName: creditName,
                summ: summ,
                creditPurpose: creditPurpose
            },
            "deposit": {
                depositName: depositName,
                summ: summ,
                depDays: depDays
            },
            "save": {
                saveName: saveName,
            }
        };

        const requestData = {
            currencyName,
            accType,
            ...(accountTypeData[accType as keyof AccountTypeData] || {}),
        };

        try {
            const responseCommon = await axios.post("http://127.0.0.1:8000/api/accounts/create",
                requestData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': access_token
                    },
                });

            console.log("Account created:", responseCommon.data);
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };



    const [selectedCurrency, setSelectedCurrency] = useState<number>(0);
    const [selectedCard, setSelectedCard] = useState<number>(0);
    const [selectedPurpose, setSelectedPurpose] = useState<number>(0);
    const [selectedInput, setInputValue] = useState<string>('');
    const [selectedFrst, setInputFrst] = useState<string>('');
    const [selectedScnd, setInputScnd] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<number>(0);

    if (accType === "card"){
        return (
        <div className="card">
            <h2>Карта</h2>

            <DropdownMenu
                options={cards}
                defaultTitle="Выберите карту"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCard(id)}
                isDisabled={false}
            />
            <DropdownMenu
                options={currency}
                defaultTitle="Выберите валюту"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCurrency(id)}
                isDisabled={false}
            />
            <form className="input-bar">
                <input
                    type="text"
                    placeholder="Введите имя"
                    onChange={(e) => setInputFrst(e.target.value)}
                />
            </form>
            <form className="input-bar">
                <input
                    type="text"
                    placeholder="Введите фамилию"
                    onChange={(e) => setInputScnd(e.target.value)}
                />
            </form>
            <Link to={`/agreements`}>
                <button className="send-button" onClick={handleSubmit}>Добавить</button>
            </Link>
        </div>
        );
    }
    if (accType === "credit") {
        return( <div className="card">
            <h2>Кредит</h2>
            <DropdownMenu
                options={credits}
                defaultTitle="Выберите тип кредита"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCard(id)}
                isDisabled={false}
            />
            <form className="input-bar">
                <input
                    type="text"
                    placeholder="Введите сумму"
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
            <DropdownMenu
                options={currency}
                defaultTitle="Выберите валюту"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCurrency(id)}
                isDisabled={false}
            />
            <DropdownMenu
                options={purpose}
                defaultTitle="Выберите цель кредита"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedPurpose(id)}
                isDisabled={false}
            />
            <Link to={`/agreements`}>
                <button className="send-button" onClick={handleSubmit}>Добавить</button>
            </Link>
        </div>);
    }
    if (accType === "deposit"){
        return(<div className="card">
            <h2>Вклад</h2>
            <DropdownMenu
                options={deposits}
                defaultTitle="Выберите вклад"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCard(id)}
                isDisabled={false}
            />
            <form className="input-bar">
                <input
                    type="text"
                    placeholder="Введите сумму"
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
            <DropdownMenu
                options={currency}
                defaultTitle="Выберите валюту"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCurrency(id)}
                isDisabled={false}
            />
            <DropdownMenu
                options={days}
                defaultTitle="Выберите длительность"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedDays(id)}
                isDisabled={false}
            />
                <Link to={`/agreements`}>
                    <button className="send-button" onClick={handleSubmit}>Добавить</button>
                </Link>
        </div>
        );
    }
    if (accType === "save"){
        return(<div className="card">
            <h2>Сберегательный счет</h2>
            <DropdownMenu
                options={saves}
                defaultTitle="Выберите тип"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCard(id)}
                isDisabled={false}
            />
            <DropdownMenu
                options={currency}
                defaultTitle="Выберите валюту"
                appendDefaultTitle={false}
                setSelectedOption={(id: number) => setSelectedCurrency(id)}
                isDisabled={false}
            />
            <Link to={`/agreements`}>
            <button className="send-button" onClick={handleSubmit}>Добавить</button>
            </Link>
        </div>
        );
    }
};

export default AddAccountPage;
