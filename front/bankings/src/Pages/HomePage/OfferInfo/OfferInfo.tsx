// @ts-ignore
import React, { useEffect, useState } from "react";
//import { FaCaretDown } from "react-icons/fa";
import "./OfferInfo.css";
import DropdownMenu from "../../../Components/DropdownMenu/DropdownMenu"
import axios from "axios";
import {useToken} from "../../../hooks/useToken";
//import {Offer} from "../../../Types";

export const OfferInfo = () => {

    const { access_token } = useToken()

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

    const credit = [
        { id: 1, name: "INK Возможности" },
    ]

    const deposit = [
        { id: 1, name: "Выгодный" },
    ]

    const save = [
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

    useEffect(() => {
        //fetchData()
    }, []);

    const [selectedCard1, setSelectedCard1] = useState<number>(0);
    const [selectedCurrency1, setSelectedCurrency1] = useState<number>(0);
    const [selectedCard2, setSelectedCard2] = useState<number>(0);
    const [selectedCurrency2, setSelectedCurrency2] = useState<number>(0);
    const [selectedPurpose2, setSelectedPurpose2] = useState<number>(0);
    const [selectedCard3, setSelectedCard3] = useState<number>(0);
    const [selectedCurrency3, setSelectedCurrency3] = useState<number>(0);
    const [selectedDays3, setSelectedDays3] = useState<number>(0);
    const [selectedCard4, setSelectedCard4] = useState<number>(0);
    const [selectedCurrency4, setSelectedCurrency4] = useState<number>(0);
    const [selectedInput2, setInputValue2] = useState<string>("");
    const [selectedInput3, setInputValue3] = useState<string>("");

    const logSelectedValues1 = async () => {
        if (selectedCard1 !== undefined && selectedCurrency1 !== undefined) {
            const cardName = getNameById(cards, selectedCard1);
            const currencyName = getNameById(currency, selectedCurrency1);
            const requestData = {
                cardName,
                currencyName,
            };

                const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/create', requestData,{
                    headers: {
                        'authorization': `${access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
                return data
        }
    };

    const logSelectedValues2 = async () => {
        if (selectedCard2 !== undefined && selectedCurrency2 !== undefined  && selectedInput2 !== undefined && selectedPurpose2 !== undefined) {
            const cardName = getNameById(cards, selectedCard2);
            const summ = selectedInput2;
            const currencyName = getNameById(currency, selectedCurrency2);
            const creditPurpose = getNameById(purpose, selectedPurpose2);

            const { data } = await axios('http://127.0.0.1:8000/api/credits/post/', {
                method: "GET",
                headers: {
                    'Authorization': `${access_token}`
                },
                params: {
                    cardName,
                    summ,
                    currencyName,
                    creditPurpose
                }
            });
            return data
        }
    };

    const logSelectedValues3 = async () => {
        if (selectedCard3 !== undefined && selectedCurrency3 !== undefined && selectedInput3 !== undefined && selectedDays3 !== undefined) {
            const cardName = getNameById(cards, selectedCard3);
            const summ = selectedInput3
            const currencyName = getNameById(currency, selectedCurrency3);
            const depositDays = getNameById(days, selectedDays3);

            const { data } = await axios('http://127.0.0.1:8000/api/deposits/post/', {
                method: "GET",
                headers: {
                    'authorization': `${access_token}`
                },
                params: {
                    cardName,
                    summ,
                    currencyName,
                    depositDays
                }
            });
            return data
        }
    };

    const logSelectedValues4 = async () => {
        if (selectedCard4 !== undefined && selectedCurrency4 !== undefined) {
            const cardName = getNameById(cards, selectedCard4);
            const currencyName = getNameById(currency, selectedCurrency4);

            const { data } = await axios('http://127.0.0.1:8000/api/saves/post/', {
                method: "GET",
                headers: {
                    'authorization': `${access_token}`
                },
                params: {
                    cardName,
                    currencyName,
                }
            });
            return data
        }
    };

    return (
        <div className="offers-wrapper">
            <div className="card">
                <h2>Карта</h2>

                <DropdownMenu
                    options={cards}
                    defaultTitle="Выберите карту"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCard1(id)}
                    isDisabled={false}
                />
                <DropdownMenu
                    options={currency}
                    defaultTitle="Выберите валюту"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCurrency1(id)}
                    isDisabled={false}
                />
                <button onClick={logSelectedValues1}>Вывод</button>
            </div>

            <div className="card">
                <h2>Кредит</h2>
                <DropdownMenu
                    options={credit}
                    defaultTitle="Выберите тип кредита"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCard2(id)}
                    isDisabled={false}
                />
                <form className="input-bar">
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        onChange={(e) => setInputValue2(e.target.value)}
                    />
                </form>
                <DropdownMenu
                    options={currency}
                    defaultTitle="Выберите валюту"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCurrency2(id)}
                    isDisabled={false}
                />
                <DropdownMenu
                    options={purpose}
                    defaultTitle="Выберите цель кредита"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedPurpose2(id)}
                    isDisabled={false}
                />
                <button onClick={logSelectedValues2}>Вывод</button>
            </div>

            <div className="card">
                <h2>Вклад</h2>
                <DropdownMenu
                    options={deposit}
                    defaultTitle="Выберите вклад"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCard3(id)}
                    isDisabled={false}
                />
                <form className="input-bar">
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        onChange={(e) => setInputValue3(e.target.value)}
                    />
                </form>
                <DropdownMenu
                    options={currency}
                    defaultTitle="Выберите валюту"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCurrency3(id)}
                    isDisabled={false}
                />
                <DropdownMenu
                    options={days}
                    defaultTitle="Выберите длительность"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedDays3(id)}
                    isDisabled={false}
                />
                <button onClick={logSelectedValues3}>Вывод</button>
            </div>

            <div className="card">
                <h2>Сберегательный счет</h2>
                <DropdownMenu
                    options={save}
                    defaultTitle="Выберите тип"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCard4(id)}
                    isDisabled={false}
                />
                <DropdownMenu
                    options={currency}
                    defaultTitle="Выберите валюту"
                    appendDefaultTitle={false}
                    setSelectedOption={(id: number) => setSelectedCurrency4(id)}
                    isDisabled={false}
                />
                <button onClick={logSelectedValues4}>Вывод</button>
            </div>
        </div>
    );
};

export default OfferInfo;
