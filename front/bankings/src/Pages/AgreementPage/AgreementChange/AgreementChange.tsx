import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgreementChange.css";
import DropdownMenu from "../../../Components/DropdownMenu/DropdownMenu";
import { useParams } from "react-router-dom";
import { Link} from 'react-router-dom';

const EditAgreementPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Используем useParams для получения параметра из URL

    const agreementId = parseInt(id!, 10); // Преобразуем параметр в число

    const [formData, setFormData] = useState({
        type: "",
        user_id_refer: "",
        description: "",
        small_desc: "",
    });

    const [selectedType, setSelectedType] = useState<number | string>("");

    const type = [
        { id: 1, name: "Карта" },
        { id: 2, name: "Кредитный счет" },
        { id: 3, name: "Вклад" },
        { id: 4, name: "Сберегательный счет" },
    ];

    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/agreements/${agreementId}/`);
                const agreementData = response.data;
                setFormData({
                    type: agreementData.type.toString(),
                    user_id_refer: agreementData.user_id_refer.toString(),
                    description: agreementData.description,
                    small_desc: agreementData.small_desc,
                });
                setSelectedType(agreementData.type.toString());
            } catch (error) {
                console.error("Error fetching agreement:", error);
            }
        };

        fetchAgreement();
    }, [agreementId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    interface Card {
        id: number;
        name: string;
    }
    const getNameById = (cards: Card[], id: number): string => {
        const foundCard = cards.find(card => card.id === id);
        return foundCard ? foundCard.name : '';
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/agreements/${agreementId}/put/`, {
                ...formData,
                type: selectedType,
            });

            console.log("Agreement updated:", response.data);
        } catch (error) {
            console.error("Error updating agreement:", error);
        }
    };

    return (
        <div className="add-agreement-wrapper">
            <h2 className="header-name">Редактировать договор</h2>
            <form>
                <div className="card">
                    <DropdownMenu
                        options={type}
                        defaultTitle="Выберите тип счета"
                        appendDefaultTitle={false}
                        setSelectedOption={(id: number) => setSelectedType(getNameById(type, id))}
                        isDisabled={false}
                    />
                </div>
                <div className="card">
                    <label>ID пользователя:</label>
                    <input
                        type="text"
                        name="user_id_refer"
                        value={formData.user_id_refer}
                        onChange={handleChange}
                    />
                </div>
                <div className="card">
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="card">
                    <label>Мини-описание:</label>
                    <input
                        type="text"
                        name="small_desc"
                        value={formData.small_desc}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <Link to={`/agreements`}>
            <button className="add-agreement-button" onClick={handleUpdate}>
                Обновить
            </button>
            </Link>
        </div>
    );
};

export default EditAgreementPage;