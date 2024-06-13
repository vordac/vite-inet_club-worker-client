import React, { useEffect, useState } from 'react'
import ItemTariff from '../../items/admin/ItemTariff';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function TariffList({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [tariffs, setTariffs] = useState(null);
    const [name_tariff, setNameTariff] = useState('');
    const [price_tariff, setPriceTariff] = useState('');

    const handlePostTariff = async () => {

        if (!name_tariff) {
            Swal.fire({
                icon: 'error',
                text: 'Назва відсутня',
            })
            return;
        }

        if (!price_tariff) {
            Swal.fire({
                icon: 'error',
                text: 'Модель відсутня',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-tariff', {
                name_tariff: name_tariff,
                price_tariff: price_tariff,
            });
            setUpdate(update += 1);
        } catch (error) {
            tariffs.error('Error posting tariff:', error);
            setError('Error posting tariff');
        }
    };

    useEffect(() => {
        async function fetchTariff() {
            try {
                const response = await axios.get('http://localhost:5001/get-tariff');
                setTariffs(response.data);
            } catch (error) {
                tariffs.error('Error fetching tariff:', error);
                setError('Error fetching tariff');
            }
        }

        fetchTariff();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!tariffs) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='tariff'>
            <div className='workview-controls'>
                <input placeholder='Назва тарифу' value={name_tariff} onChange={(e) => setNameTariff(e.target.value)} />
                <input placeholder='Ціна тарифу' value={price_tariff} onChange={(e) => setPriceTariff(e.target.value)} />
                <button onClick={handlePostTariff}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(tariffs) && tariffs.map((tariffs) => (
                        <ItemTariff
                            tariff={{ ...tariffs }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default TariffList;
