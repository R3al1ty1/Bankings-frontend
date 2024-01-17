// @ts-ignore
import React, { useState, useEffect, Dispatch } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Account } from '../../../Types';
import { iAccountsMock, requestTime } from '../../../Consts';
import { useToken } from '../../../hooks/useToken';
import "./AccountInfo.css"
// @ts-ignore
import cardImage from "./card.png"
// @ts-ignore
import saveImage from "./save.png"

const AccountInfo = ({ account_id, selectedAccount, setSelectedAccount }: { account_id: number | undefined, selectedAccount: Account | undefined, setSelectedAccount: Dispatch<Account | undefined> }) => {
    const { access_token } = useToken();
    const [isMock, setIsMock] = useState<boolean>(true);
    const [, setImageUrl] = useState<string>('');
    const navigate = useNavigate();

    const getCurrencySymbol = (currencyCode: number) => {
        switch (currencyCode) {
            case 643:
                return '₽';
            case 840:
                return '$';
            case 978:
                return '€';
            default:
                return '';
        }
    };

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-US');
    };

    const fetchData = async () => {
        try {
            const response1 = await fetch(`http://127.0.0.1:8000/api/accounts/${account_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
            });

            if (!response1.ok) {
                MockAccountInfo();
            }

            const account: Account = await response1.json();
            setSelectedAccount(account);
            setImageUrl(`http://127.0.0.1:8000/api/icon/${selectedAccount?.type}/`);
        } catch (e) {
            MockAccountInfo();
        }
    };

    const onDelete = () => {
        if (selectedAccount) {
            fetch(`http://127.0.0.1:8000/api/accounts/${selectedAccount.id}/delete/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error('Something went wrong');
                })
                .then(() => {
                    navigate('/accounts');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const MockAccountInfo = () => {
        setSelectedAccount(iAccountsMock.find((account: Account) => account.id === account_id));
        setIsMock(true);
    };

    const icon = `http://127.0.0.1:8000/api/icon/${selectedAccount?.type}/`;
    // const imageUrl = isMock ? getLocalImage() : icon;

    useEffect(() => {
        fetchData();
    }, []);

    if (!selectedAccount) {
        return (
            <div>
            </div>
        );
    }



    if (isMock) {
        if (selectedAccount.type === "Карта"){
            return (
                <div className={"account-info-wrapper"}>
                    <div className="account-info-details">
                        <h3>{selectedAccount.name}</h3>
                        <div className="image-balance">
                            <img src={cardImage} className="account-icon" alt="Account Icon" />
                            <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                        </div>
                        <span>Номер счета: {selectedAccount.number}</span>
                        <span>БИК банка: {selectedAccount.bic}</span>
                        <span>Валюта: {selectedAccount.currency}</span>
                        <span>Тип счета: {selectedAccount.type}</span>
                        <div className="buttons-info">
                            <div className="home-button">
                                <Link to={`/accounts`}>
                                    <button className="account-back-button">Вернуться к счетам</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={"account-info-wrapper"}>
                <div className="account-info-details">
                    <h3>{selectedAccount.name}</h3>
                    <div className="image-balance">
                        <img src={saveImage} className="account-icon" alt="Account Icon" />
                        <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                    </div>
                    <span>Номер счета: {selectedAccount.number}</span>
                    <span>БИК банка: {selectedAccount.bic}</span>
                    <span>Валюта: {selectedAccount.currency}</span>
                    <span>Тип счета: {selectedAccount.type}</span>
                    <div className="buttons-info">
                        <div className="home-button">
                            <Link to={`/accounts`}>
                                <button className="account-back-button">Вернуться к счетам</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (selectedAccount.type == "Карта"){
        return (
            <div className="account-info-background">
                <div className={"account-info-wrapper"}>

                    <div className="account-info-details">
                        <div className="account-info-details">
                            <div className="header-name"><h3> {selectedAccount.type} {selectedAccount.name}</h3></div>
                            <div className="image-balance">
                                <img src={icon} className="account-icon" alt="Account Icon" />
                                <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                            </div>
                            <div className="account-info-additional">
                                {selectedAccount.card && selectedAccount.card[0] && (<span>Номер карты: {selectedAccount.card[0].number}</span>)}
                                {selectedAccount.card && selectedAccount.card[0] && (<span>CVV: {selectedAccount.card[0].cvv}</span>)}
                                {selectedAccount.card && selectedAccount.card[0] && (<span>Срок действия: {selectedAccount.card[0].exp_date}</span>)}
                                {selectedAccount.card && selectedAccount.card[0] && (<span>Имя: {selectedAccount.card[0].holder_first_name}</span>)}
                                {selectedAccount.card && selectedAccount.card[0] && (<span>Фамилия: {selectedAccount.card[0].holder_last_name}</span>)}
                                {selectedAccount.card && selectedAccount.card[0] && (<span>Стоимость обслуживания: {selectedAccount.card[0].maintenance_cost}</span>)}
                                <span>Номер счета: {selectedAccount.number}</span>
                                <span>БИК банка: {selectedAccount.bic}</span>
                                <span>Валюта: {selectedAccount.currency}</span>
                                <span>Тип счета: {selectedAccount.type}</span>
                            </div>
                        </div>
                        <div className="buttons-info">
                            <button className="account-delete-button-info" onClick={onDelete}>Заморозить</button>
                            <div className="home-button">
                                <Link to={`/accounts`}>
                                    <button className="account-back-button">Вернуться к счетам</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (selectedAccount.type == "Вклад" ){
        return (
            <div className="account-info-background">
                <div className={"account-info-wrapper"}>
                    <div className="account-info-details">
                        <div className="header-name"><h3> {selectedAccount.type} {selectedAccount.name}</h3></div>
                        <div className="image-balance">
                            <img src={icon} className="account-icon" alt="Account Icon" />
                            <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                        </div>
                        <div className="account-info-additional">
                            <span>Процентная ставка: {selectedAccount.deposit && selectedAccount.deposit[0] && selectedAccount.deposit[0].interest_rate} %</span>
                            <span>Дата открытия: {selectedAccount.deposit && selectedAccount.deposit[0] && selectedAccount.deposit[0].creation_date}</span>
                            <span>Дата планируемого закрытия: {selectedAccount.deposit && selectedAccount.deposit[0] && selectedAccount.deposit[0].end_date}</span>
                            <span>Срок вклада: {selectedAccount.deposit && selectedAccount.deposit[0] && selectedAccount.deposit[0].days} дней</span>
                            <span>Номер счета: {selectedAccount.number}</span>
                            <span>БИК банка: {selectedAccount.bic}</span>
                            <span>Валюта: {selectedAccount.currency}</span>
                            <span>Тип счета: {selectedAccount.type}</span>
                            {selectedAccount.credit && selectedAccount.credit[0] && (<span>Процентная ставка: {selectedAccount.credit[0].interest_rate}</span>)}
                        </div>
                        <div className="buttons-info">
                            <button className="account-delete-button-info" onClick={onDelete}>Заморозить</button>
                            <div className="home-button">
                                <Link to={`/accounts`}>
                                    <button className="account-back-button">Вернуться к счетам</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (selectedAccount.type == "Сберегательный счет" ) {
        return (
            <div className="account-info-background">
                <div className={"account-info-wrapper"}>
                    <div className="account-info-details">
                        <div className="header-name"><h3> {selectedAccount.type} {selectedAccount.name}</h3></div>
                        <div className="image-balance">
                            <img src={icon} className="account-icon" alt="Account Icon" />
                            <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                        </div>
                        <div className="account-info-additional">
                            <span>Процентная ставка: {selectedAccount.save && selectedAccount.save[0] && selectedAccount.save[0].interest_rate} %</span>
                            <span>Номер счета: {selectedAccount.number}</span>
                            <span>БИК банка: {selectedAccount.bic}</span>
                            <span>Валюта: {selectedAccount.currency}</span>
                            <span>Тип счета: {selectedAccount.type}</span>
                        </div>
                        <div className="buttons-info">
                            <button className="account-delete-button-info" onClick={onDelete}>Заморозить</button>
                            <div className="home-button">
                                <Link to={`/accounts`}>
                                    <button className="account-back-button">Вернуться к счетам</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (selectedAccount.type == "Кредитный счет" ){
        return (
            <div className="account-info-background">
                <div className={"account-info-wrapper"}>
                    <div className="account-info-details">
                        <div className="account-info-details">
                            <div className="header-name"><h3> {selectedAccount.type} {selectedAccount.name}</h3></div>
                            <div className="image-balance">
                                <img src={icon} className="account-icon" alt="Account Icon" />
                                <div className="account-balance-info"><span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span></div>
                            </div>
                            <div className="account-info-additional">
                                <span>Процентная ставка: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].interest_rate} %</span>
                                <span>Ежемесячныйы платеж: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].payment_amount}</span>
                                <span>Дата открытия: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].creation_date}</span>
                                <span>Дата последнего платежа: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].end_date}</span>
                                <span>Количество платежей: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].payments_number}</span>
                                <span>Цель кредита: {selectedAccount.credit && selectedAccount.credit[0] && selectedAccount.credit[0].purpose}</span>
                                <span>Номер счета: {selectedAccount.number}</span>
                                <span>БИК банка: {selectedAccount.bic}</span>
                                <span>Валюта: {selectedAccount.currency}</span>
                                <span>Тип счета: {selectedAccount.type}</span>
                            </div>
                        </div>
                        <div className="buttons-info">
                            <button className="account-delete-button-info" onClick={onDelete}>Заморозить</button>
                            <div className="home-button">
                                <Link to={`/accounts`}>
                                    <button className="account-back-button">Вернуться к счетам</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    };

export default AccountInfo;
