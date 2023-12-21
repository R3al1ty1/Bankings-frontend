import React, { useState, useEffect } from 'react';
import { Dispatch } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Account } from '../../../Types';
import { iAccountsMock, requestTime } from '../../../Consts';
import { useToken } from '../../../hooks/useToken';
import { useAuth } from '../../../hooks/useAuth';
import "./AccountInfo.css"
import DropdownMenu from "../../../Components/DropdownMenu/DropdownMenu";


const AccountInfo = ({ account_id, selectedAccount, setSelectedAccount }: { account_id: number | undefined, selectedAccount: Account | undefined, setSelectedAccount: Dispatch<Account | undefined> }) => {
    const { access_token } = useToken();
    const { is_moderator } = useAuth();
    const [isMock, setIsMock] = useState<boolean>(true);
    const [imageUrl] = useState('');
    const navigate = useNavigate();

    const [editData, setEditData] = useState({
        name: '',
        number: 0,
        currency: 0,
        cvv: 0,
        expDate: '',
        holderFirstName: '',
        holderLastName: '',
        maintenanceCost: 0,
    });

    const currency = [
        { id: 643, name: "₽" },
        { id: 840, name: "$" },
        { id: 978, name: "€" },
    ]

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
            if (is_moderator) {
                // ... (ваш существующий код)
            }

            setEditData((prevData) => ({
                ...prevData,
                name: account.name,
                currency: account.currency,
                number: account.number,
                cvv: account.card && account.card[0]?.cvv !== undefined ? account.card[0]?.cvv : 0,
                expDate: account.card && account.card[0]?.exp_date ? account.card[0]?.exp_date : '',
                holderFirstName: account.card && account.card[0]?.holder_first_name ? account.card[0]?.holder_first_name : '',
                holderLastName: account.card && account.card[0]?.holder_last_name ? account.card[0]?.holder_last_name : '',
                maintenanceCost: account.card && account.card[0]?.maintenance_cost !== undefined ? account.card[0]?.maintenance_cost : 0,
            }));

            setSelectedAccount(account);
            setIsMock(false);
        } catch (e) {
            MockAccountInfo();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCurrencySelect = (selectedCurrency: any) => {
        setEditData((prevData) => ({
            ...prevData,
            currency: selectedCurrency,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/accounts/${selectedAccount?.id}/put/`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': access_token,
            },
            body: JSON.stringify(editData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
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

    const icon = `http://127.0.0.1:8000/api/icon/${selectedAccount?.type}/`;

    const MockAccountInfo = () => {
        setSelectedAccount(iAccountsMock.find((account: Account) => account.id === account_id));
        setIsMock(true);
    };

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
        return (
            <div className={"account-info-wrapper"}>
                <div className="account-info-details">
                    <h3>{selectedAccount.name}</h3>
                    <img src={imageUrl} alt="Account Icon" />
                    <span>Баланс: 0</span>
                    <span>Номер счета: номер Вашего счета</span>
                    <span>БИК банка: INK</span>
                    <span>Валюта: руб</span>
                    <span>Тип счета: карта</span>
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
        );
    }

    if (selectedAccount.type == "Карта" && !is_moderator){
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

    if (selectedAccount.type == "Вклад" && !is_moderator){
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

    if (selectedAccount.type == "Сберегательный счет" && !is_moderator) {
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

    if (selectedAccount.type == "Кредитный счет" && !is_moderator){
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

    if (selectedAccount.type == "Карта" && is_moderator) {
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
                            <h3>Форма изменения</h3>
                            <form onSubmit={handleSubmit} className="account-info-edit-details">
                                <label className="account-info-name-edit">
                                    Имя:
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleChange}
                                        className="account-input"
                                    />
                                </label>
                                <label className="account-info-balance-edit">
                                    Валюта:
                                    <DropdownMenu
                                        options={currency}
                                        defaultTitle="Выберите валюту"
                                        appendDefaultTitle={false}
                                        setSelectedOption={handleCurrencySelect}
                                        isDisabled={false}
                                    />
                                </label>
                                <label className="account-info-cvv-info">
                                    CVV:
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={editData.cvv}
                                        onChange={handleChange}
                                        className="account-input"
                                    />
                                </label>
                                <button type="submit" className="account-edit-button">
                                    Сохранить
                                </button>
                            </form>
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
            );
        }
    if (selectedAccount.type == "Вклад" && is_moderator) {
        return (
            <div className="account-info-background">
                <div className={"account-info-wrapper"}>
                    <div className="account-info-details">
                        <div className="header-name"><h3> {selectedAccount.type} {selectedAccount.name}</h3></div>
                        <div className="image-balance">
                            <img src={icon} className="account-icon" alt="Account Icon"/>
                            <div className="account-balance-info">
                                <span>{formatCurrency(Number(selectedAccount.amount as string))} {getCurrencySymbol(selectedAccount.currency)}</span>
                            </div>
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
                            {selectedAccount.credit && selectedAccount.credit[0] && (
                                <span>Процентная ставка: {selectedAccount.credit[0].interest_rate}</span>)}
                        </div>
                        <h3>Форма изменения</h3>
                        <form onSubmit={handleSubmit} className="account-info-edit-details">
                            <label className="account-info-name-edit">
                                Имя:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleChange}
                                    className="account-input"
                                />
                            </label>
                            <label className="account-info-balance-edit">
                                Валюта:
                                <DropdownMenu
                                    options={currency}
                                    defaultTitle="Выберите валюту"
                                    appendDefaultTitle={false}
                                    setSelectedOption={handleCurrencySelect}
                                    isDisabled={false}
                                />
                            </label>
                            <button type="submit" className="account-edit-button">
                                Сохранить
                            </button>
                        </form>
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
    };

    if (selectedAccount.type == "Сберегательный счет" && is_moderator) {
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
                        <h3>Форма изменения</h3>
                        <form onSubmit={handleSubmit} className="account-info-edit-details">
                            <label className="account-info-name-edit">
                                Имя:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleChange}
                                    className="account-input"
                                />
                            </label>
                            <label className="account-info-balance-edit">
                                Валюта:
                                <DropdownMenu
                                    options={currency}
                                    defaultTitle="Выберите валюту"
                                    appendDefaultTitle={false}
                                    setSelectedOption={handleCurrencySelect}
                                    isDisabled={false}
                                />
                            </label>
                            <button type="submit" className="account-edit-button">
                                Сохранить
                            </button>
                        </form>
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
    if (selectedAccount.type == "Кредитный счет" && is_moderator){
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
                        <h3>Форма изменения</h3>
                        <form onSubmit={handleSubmit} className="account-info-edit-details">
                            <label className="account-info-name-edit">
                                Имя:
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleChange}
                                    className="account-input"
                                />
                            </label>
                            <label className="account-info-balance-edit">
                                Валюта:
                                <DropdownMenu
                                    options={currency}
                                    defaultTitle="Выберите валюту"
                                    appendDefaultTitle={false}
                                    setSelectedOption={handleCurrencySelect}
                                    isDisabled={false}
                                />
                            </label>
                            <button type="submit" className="account-edit-button">
                                Сохранить
                            </button>
                        </form>
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
