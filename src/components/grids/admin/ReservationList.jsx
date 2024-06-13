import React, { useEffect, useState } from 'react'
import ItemReservation from '../../items/admin/ItemReservation';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function ReservationList({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [name_reservation, setNameReservation] = useState('');
    const [model_reservation, setModelReservation] = useState('');
    const [quantity_reservation, setQuantityReservation] = useState('');

    const handlePostReservation = async () => {

        if (!name_reservation) {
            Swal.fire({
                icon: 'error',
                text: 'Назва відсутня',
            })
            return;
        }

        if (!model_reservation) {
            Swal.fire({
                icon: 'error',
                text: 'Модель відсутня',
            })
            return;
        }

        if (quantity_reservation < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-reservation', {
                name_reservation: name_reservation,
                model_reservation: model_reservation,
                quantity_reservation: quantity_reservation
            });
            setUpdate(update += 1);
        } catch (error) {
            reservation.error('Error posting reservation:', error);
            setError('Error posting reservation');
        }
    };

    useEffect(() => {
        async function fetchReservation() {
            try {
                const response = await axios.get('http://localhost:5001/get-reservation');
                setReservations(response.data);
            } catch (error) {
                reservations.error('Error fetching reservation:', error);
                setError('Error fetching reservation');
            }
        }

        fetchReservation();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!reservations) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='reservation'>
            <div className='workview-controls'>
                <input placeholder='Назва консолі' value={name_reservation} onChange={(e) => setNameReservation(e.target.value)} />
                <input placeholder='Модель консолі' value={model_reservation} onChange={(e) => setModelReservation(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_reservation} onChange={(e) => setQuantityReservation(e.target.value)} />
                <button onClick={handlePostReservation}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(reservations) && reservations.map((reservations) => (
                        <ItemReservation
                            reservation={{ ...reservations }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ReservationList;
