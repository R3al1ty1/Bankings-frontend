// @ts-ignore
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../../../hooks/useToken';
import { Agreement } from '../../../../Types';
import './AgreementOpenInfo.css';
import {Link} from "react-router-dom";

export const AgreementsOpenInfo = () => {
    const { access_token } = useToken();
    const [data, setData] = useState<Agreement[]>([]);
    const [, setError] = useState<Error | null>(null);
    const [, setIsLoading] = useState(true);

    const fetchAgreementsData = async () => {
        try {
            const apiUrl = 'http://127.0.0.1:8000/api/agreements/open/';

            const { data } = await axios.get<Agreement[]>(apiUrl, {
                headers: {
                    Authorization: `${access_token}`,
                },
            });

            setData(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAgreementsData();
    }, []);
    const icon = `http://127.0.0.1:8000/api/icon/agreement/`;
    return (
        <div className="open-wrapper">
            {data.map((agreement) => (
                <div className="agreements-card" key={agreement.id}>
                    <img src={icon} className="account-icon" alt="Account Icon" />
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