import { useEffect } from 'react';
import { Dispatch } from 'react';
import { Link} from 'react-router-dom';
import { Agreement } from '../../../Types';
import {useAuth} from "../../../hooks/useAuth";
import "./AgreementInfo.css"


const AgreementInfo = ({ agreement_id, agreement_type, selectedAgreement}: { agreement_id: number | undefined, agreement_type: string, user_id_refer: number | undefined, selectedAgreement: Agreement | undefined, setSelectedAgreement: Dispatch<Agreement | undefined> }) => {
    const {is_moderator, is_authenticated} = useAuth()
    const fetchData = async () => {
        try {
            const response1 = await fetch(`http://127.0.0.1:8000/api/agreements/${agreement_id}/`, {
                method: "GET",
            });

            if (!response1.ok) {
            }

            
        } catch (e) {
        }
    };

    const agrTypeDictionary: Record<string, string> = {
        'Карта': 'card',
        'Кредитный счет': 'credit',
        'Вклад': 'deposit',
        'Сберегательный счет': 'save',
    };


    const icon = `http://127.0.0.1:8000/api/icon/agreement/`;

    useEffect(() => {
        fetchData();
    }, []);

    if (!selectedAgreement) {
        return (
            <div>
            </div>
        );
    }

    return (
        <div className="agreement-info-background">
            <div className={"agreement-info-wrapper"}>

                <div className="agreement-info-details">
                    <div className="agreement-info-details">
                        <div className="image-balance">
                            <img src={icon} className="agreement-icon" alt="Agreement Icon" />
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
                            {is_authenticated && agrTypeDictionary[agreement_type] && (
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
    )
    };

export default AgreementInfo;
