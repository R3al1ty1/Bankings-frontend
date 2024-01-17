import React, { useState } from "react";
import axios from "axios";
import "./AgreementCreate.css";
import { Link} from 'react-router-dom';
import DropdownMenu from "../../../Components/DropdownMenu/DropdownMenu";

const AddAgreementPage: React.FC = () => {
    const [formData, setFormData] = useState({
        type: "", // Теперь type будет строкой, а не числом
        user_id_refer: "",
        description: "",
        small_desc: "",
    });

    interface Card {
        id: number;
        name: string;
    }
    const getNameById = (cards: Card[], id: number): string => {
        const foundCard = cards.find(card => card.id === id);
        return foundCard ? foundCard.name : '';
    };

    const [selectedType, setSelectedType] = useState<number | string>(""); // Обновленный тип для selectedType

    const type = [
        { id: 1, name: "Карта" },
        { id: 2, name: "Кредитный счет" },
        { id: 3, name: "Вклад" },
        { id: 4, name: "Сберегательный счет" },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // Обновленный код для передачи типа как строкового значения
            const response = await axios.post("http://127.0.0.1:8000/api/agreements/post/", {
                ...formData,
                type: selectedType,
            });

            console.log("Agreement created:", response.data);

            setFormData({
                type: "",
                user_id_refer: "",
                description: "",
                small_desc: "",
            });
        } catch (error) {
            console.error("Error creating agreement:", error);
        }
    };

    return (
        <div className="add-agreement-wrapper">
            <h2 className="header-name">Новый договор</h2>
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
            <button className="add-agreement-button" onClick={handleSubmit}>
                Создать
            </button>
            </Link>
        </div>
    );
};

export default AddAgreementPage;
