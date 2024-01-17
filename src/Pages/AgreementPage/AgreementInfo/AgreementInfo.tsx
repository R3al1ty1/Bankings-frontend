// @ts-ignore
import React, { useEffect } from 'react';
import { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { Agreement } from '../../../Types';
import { useAuth } from '../../../hooks/useAuth';
import './AgreementInfo.css';
// @ts-ignore
import agrImage from "../../AgreementsPage/AgreementsOpen/AgreementsOpenInfo/agreement.png";

const AgreementInfo = ({
                           agreement_id,
                           agreement_type,
                           user_id_refer,
                           selectedAgreement,
                           setSelectedAgreement,
                       }: {
    agreement_id: number | undefined;
    agreement_type: string;
    user_id_refer: number | undefined;
    selectedAgreement: Agreement | undefined;
    setSelectedAgreement: Dispatch<Agreement | undefined>;
}) => {
    const { is_moderator, is_authenticated } = useAuth();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/agreements/${agreement_id}/`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedAgreement(data);
            } else {
                // Если получен неудачный ответ, используйте моки
                setSelectedAgreement(mockAgreements.find((agreement) => agreement.id === agreement_id));
            }
        } catch (error) {
            // Если произошла ошибка, также используйте моки
            setSelectedAgreement(mockAgreements.find((agreement) => agreement.id === agreement_id));
        }
    };

    const agrTypeDictionary: Record<string, string> = {
        Карта: 'card',
        'Кредитный счет': 'credit',
        Вклад: 'deposit',
        'Сберегательный счет': 'save',
    };

    const icon = `http://127.0.0.1:8000/api/icon/agreement/`;

    useEffect(() => {
        fetchData();
    }, []);

    if (!selectedAgreement) {
        return <div></div>;
    }

    return (
        <div className="agreement-info-background">
            <div className={'agreement-info-wrapper'}>
                <div className="agreement-info-details">
                    <div className="agreement-info-details">
                        <div className="image-balance">
                            <img src={icon} onError={(e) => e.currentTarget.src = agrImage} className="account-icon" alt="Agreement Icon" />
                            <div className="agreement-balance-info">{selectedAgreement.small_desc}</div>
                        </div>
                        <span>Номер договора: {selectedAgreement.id}</span>
                        <div className="agreement-info-additional">
                            <span>{selectedAgreement.description}</span>
                        </div>
                    </div>
                    <div className="agreement-buttons-info">
                        <div className="home-button">
                            <Link to={`/agreements`}>
                                <button className="agreement-back-button">Вернуться к договорам</button>
                            </Link>
                            {is_authenticated && user_id_refer && agrTypeDictionary[agreement_type] && (
                                <Link to={`/agreements/${agrTypeDictionary[agreement_type]}`}>
                                    <button className="agreement-account-button">Оформить счет</button>
                                </Link>
                            )}
                            {is_moderator && (
                                <Link to={`/agreements/edit/${agreement_id}`}>
                                    <button className="agreement-back-button">Редактировать договор</button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgreementInfo;

const mockAgreements: Agreement[] = [
    { id: 1, type: 'Карта', description: 'Теперь Вы можете открывать новые карты по этому договору', small_desc: 'Договор на открытие карты' },
    { id: 2, type: 'Кредитный счет', description: 'С этим договором Вы сможете взять кредит на выгодных условиях от INK Bank', small_desc: 'Договор на открытие кредита' },
    { id: 3, type: 'Вклад', description: 'Откройте вклад с высокими процентными ставками от INK Bank уже сегодня!', small_desc: 'Договор на открытие вклада' },
    { id: 4, type: 'Сберегательный счет', description: 'Сохраните средства удобным и доступным способом', small_desc: 'Договор на открытие копилки' },
];
