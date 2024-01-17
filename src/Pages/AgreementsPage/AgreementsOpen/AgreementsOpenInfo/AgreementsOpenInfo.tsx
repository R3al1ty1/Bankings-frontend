// @ts-ignore
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../../../hooks/useToken';
import { Agreement } from '../../../../Types';
import './AgreementOpenInfo.css';
import { Link } from "react-router-dom";
// @ts-ignore
import agrImage from "./agreement.png"

const mockAgreements: Agreement[] = [
    { id: 1, type: "Карта", description: "Теперь Вы можете открывать новые карты по этому договору", small_desc: "Договор на открытие карты" },
    { id: 2, type: "Кредитный счет", description: "С этим договором Вы сможете взять кредит на выгодных условиях от INK Bank", small_desc: "Договор на открытие кредита" },
    { id: 3, type: "Вклад", description: "Откройте вклад с высокими процентными ставками от INK Bank уже сегодня!", small_desc: "Договор на открытие вклада" },
    { id: 4, type: "Сберегательный счет", description: "Сохраните средства удобным и доступным способом", small_desc: "Договор на открытие копилки" },
];

export const AgreementsOpenInfo = () => {
    const { access_token } = useToken();
    const [data, setData] = useState<Agreement[]>(mockAgreements); // Используем моки по умолчанию
    const [, setError] = useState<Error | null>(null);
    const [, setIsLoading] = useState(true);

    const fetchAgreementsData = async () => {
        try {
            const apiUrl = 'http://127.0.0.1:8000/api/agreements/open/';

            const { data } = await axios.get<Agreement[]>(apiUrl, {
                headers: {
                    Authorization: access_token,
                },
            });

            setData(data);
        } catch (error) {
            setError(error as Error);
            // При ошибке используем mock-данные
            setData(mockAgreements);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAgreementsData();
    }, []);

    const icon = `http://127.0.0.1:8000/api/icon/agreement`;

    return (
        <div className="open-wrapper">
            {data.map((agreement) => (
                <div className="agreements-card" key={agreement.id}>
                    <img src={icon} onError={(e) => e.currentTarget.src = agrImage} className="account-icon" alt="Agreement Icon" />
                    <h2>{agreement.small_desc}</h2>
                    <div className="right-container">
                        <Link to={`/agreements/${agreement.id}`}>
                            <button className="agreement-info-button">Подробнее</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgreementsOpenInfo;
