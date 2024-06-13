import React, { useEffect, useState } from 'react'
import ItemSeat from '../../items/admin/ItemSeat';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function GridSeat({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [seats, setSeats] = useState(null);
    const [number_seat, setNumberSeat] = useState('');
    const [status_seat, setStatusSeat] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');

    const handlePostSeat = async () => {

        if (!number_seat) {
            Swal.fire({
                icon: 'error',
                text: 'Номер відсутній',
            })
            return;
        }

        if (!selectedDevice) {
            Swal.fire({
                icon: 'error',
                text: 'Пристрій відсутній',
            })
            return;
        }

        if (!status_seat) {
            Swal.fire({
                icon: 'error',
                text: 'Статус відсутній',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-seat', {
                number_seat: number_seat,
                id_device: selectedDevice,
                status_seat: status_seat,
            });
            setUpdate(update += 1);
        } catch (error) {
            seats.error('Error posting seat:', error);
            setError('Error posting seat');
        }
    };

    const getDeviceName = (id_device) => {
        if (!devices || !id_device) return '';
        const device = devices.find((device) => device.id_device === id_device);
        return device ? device.name_device : '';
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
        async function fetchDevice() {
            try {
                const response = await axios.get('http://localhost:5001/get-device');
                setDevices(response.data);
            } catch (error) {
                devices.error('Error fetching device:', error);
                setError('Error fetching device');
            }
        }

        fetchDevice();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!seats) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='seat'>
            <div className='workview-controls'>
                <input placeholder='№ місця' value={number_seat} onChange={(e) => setNumberSeat(e.target.value)} />
                <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
                    <option value=''>Пристрій</option>
                    {devices.map((device) => (
                        <option key={device.id_device} value={device.id_device}>{device.name_device}</option>
                    ))}
                </select>
                <select value={status_seat} onChange={(e) => setStatusSeat(e.target.value)}>
                    <option value=''>Статус</option>
                    <option value='Вільне'>Вільне</option>
                    <option value='Зайняте'>Зайняте</option>
                </select>
                <button onClick={handlePostSeat}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(seats) && seats.map((seats) => (
                        <ItemSeat
                            seat={{ ...seats }}
                            update={update}
                            setUpdate={setUpdate}
                            getDeviceName={getDeviceName}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridSeat;
