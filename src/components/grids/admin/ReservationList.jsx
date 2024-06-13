import React, { useEffect, useState } from 'react'
import ItemReservation from '../../items/admin/ItemReservation';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function ReservationList({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [idSeat, setIdSeat] = useState(null);
    const [phone, setPhone] = useState('');
    const [timeStart, setTimeStart] = useState(new Date());
    const [hours, setHours] = useState(null);
    const [payment, setPayment] = useState('');
    const [price, setPrice] = useState(null); // people * (hours * tariffPrice)
    const [timeEnd, setTimeEnd] = useState(new Date()); // timeStart + hours
    const [nameClient, setNameClient] = useState('');
    const [idTariff, setIdTariff] = useState(null);
    const [tariffPrice, setTariffPrice] = useState(null);
    const [people, setPeople] = useState(null);

    const [seats, setSeats] = useState([]);
    const [tariffs, setTariffs] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState('');
    const [selectedTariff, setSelectedTariff] = useState('');

    useEffect(() => {
        setPrice(people * tariffPrice * hours)
    }, [people, tariffPrice, hours])

    const calculateTimeEnd = () => {
        const startTime = new Date(timeStart);
        startTime.setHours(startTime.getHours() + parseInt(hours));
        setTimeEnd(startTime);
    };

    useEffect(() => {
        calculateTimeEnd();
    }, [timeStart, hours]);


    const getSeatNumber = (id_seat) => {
        if (!seats || !id_seat) return '';
        const seat = seats.find((seat) => seat.id_seat === id_seat);
        return seat ? seat.number_seat : '';
    };

    const getTariffName = (id_tariff) => {
        if (!tariffs || !id_tariff) return '';
        const tariff = tariffs.find((tariff) => tariff.id_tariff === id_tariff);
        return tariff ? tariff.name_tariff : '';
    };

    useEffect(() => {
        async function fetchSeat() {
            try {
                const response = await axios.get('http://localhost:5001/get-seat');
                setSeats(response.data);
            } catch (error) {
                seats.error('Error fetching seat:', error);
                setError('Error fetching seat');
            }
        }

        fetchSeat();
    }, []);

    useEffect(() => {
        async function fetchTariff() {
            try {
                const response = await axios.get('http://localhost:5001/get-tariff');
                console.log("response.data: ", response.data);
                setTariffs(response.data);
            } catch (error) {
                seats.error('Error fetching seat:', error);
                setError('Error fetching seat');
            }
        }

        fetchTariff();
    }, []);

    const postReservation = async () => {
        if (!selectedSeat) {
            Swal.fire({
                icon: 'error',
                text: '№ місця відсутній',
            })
            return;
        }

        if (!selectedTariff) {
            Swal.fire({
                icon: 'error',
                text: 'Тариф відсутній',
            })
            return;
        }

        if (!tariffPrice) {
            Swal.fire({
                icon: 'error',
                text: 'Вартість тарифу відсутня',
            })
            return;
        }

        if (!phone) {
            Swal.fire({
                icon: 'error',
                text: 'Телефон відсутній',
            })
            return;
        }

        if (!people) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість людей відсутня',
            })
            return;
        }

        if (people < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість людей не може бути менше 1',
            })
            return;
        }

        if (!timeStart) {
            Swal.fire({
                icon: 'error',
                text: 'Дата резервації відсутня',
            })
            return;
        }

        if (!hours) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість годин відсутня',
            })
            return;
        }

        if (!nameClient) {
            Swal.fire({
                icon: 'error',
                text: 'Ім`я клієнта відсутнє',
            })
            return;
        }

        if (!price) {
            Swal.fire({
                icon: 'error',
                text: 'Вартість резервації відсутня',
            })
            return;
        }

        try {

            const data = {
                id_seat: selectedSeat,
                id_tariff: selectedTariff,
                price_tariff: tariffPrice,
                phone: phone,
                people: people,
                time_start: timeStart,
                time_end: timeEnd,
                hours: hours,
                name_client: nameClient,
                payment: payment,
                price: price
            }

            const response = await axios.post('http://localhost:5001/post-reservation', data);
            setUpdate(update += 1);
        } catch (error) {
            device.error('Error posting device:', error);
            setError('Error posting device');
        }
    }

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
            <div className='reservation-workview-controls'>
                <select value={selectedSeat} onChange={(e) => setSelectedSeat(e.target.value)}>
                    <option value=''>№ місця</option>
                    {seats.map((seat) => (
                        <option key={seat.id_seat} value={seat.id_seat}>{seat.number_seat}</option>
                    ))}
                </select>
                <select value={selectedTariff} onChange={(e) => {
                    setSelectedTariff(e.target.value);
                }}>
                    <option value=''>Тариф</option>
                    {tariffs.map((tariff) => (
                        <option key={tariff.id_tariff} value={tariff.id_tariff}>{tariff.name_tariff}</option>
                    ))}
                </select>
                <input placeholder="Вартість тарифу" value={tariffPrice} onChange={(e) => {
                    setTariffPrice(e.target.value);
                }} />
                <input value={phone} placeholder='Телефон' type='phone' onChange={(e) => {
                    setPhone(e.target.value);
                }} />
                <input value={people} placeholder="Кількість людей" type='number' onChange={(e) => {
                    setPeople(e.target.value);
                }} />
                <input value={timeStart} type="datetime-local" onChange={(e) => {
                    setTimeStart(e.target.value);
                }} />
                <input value={hours} placeholder='Кількість годин' type='number' onChange={(e) => {
                    setHours(e.target.value);
                }} />
                <input value={nameClient} placeholder="Ім'я клієнта" onChange={(e) => {
                    setNameClient(e.target.value);
                }} />
                <select value={payment} onChange={(e) => {
                    setPayment(e.target.value);
                }} >
                    <option value="">Тип оплати</option>
                    <option value="Картка">Картка</option>
                    <option value="Готівка">Готівка</option>
                </select>
                <input value={price} placeholder='До оплати, грн' readOnly />
                <button onClick={postReservation}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(reservations) && reservations.map((reservations) => (
                        <ItemReservation
                            reservation={{ ...reservations }}
                            update={update}
                            setUpdate={setUpdate}
                            getSeatNumber={getSeatNumber}
                            getTariffName={getTariffName}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ReservationList;
