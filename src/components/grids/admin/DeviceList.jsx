import React, { useEffect, useState } from 'react'
import ItemDevice from '../../items/admin/ItemDevice';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function DeviceList({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState(null);
    const [name_device, setNameDevice] = useState('');
    const [type_device, setModelDevice] = useState('');

    const handlePostDevice = async () => {

        if (!name_device) {
            Swal.fire({
                icon: 'error',
                text: 'Назва відсутня',
            })
            return;
        }

        if (!model_device) {
            Swal.fire({
                icon: 'error',
                text: 'Модель відсутня',
            })
            return;
        }

        if (quantity_device < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-device', {
                name_device: name_device,
                model_device: model_device,
                quantity_device: quantity_device
            });
            setUpdate(update += 1);
        } catch (error) {
            device.error('Error posting device:', error);
            setError('Error posting device');
        }
    };

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

    if (!devices) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='device'>
            <div className='workview-controls'>
                <input placeholder='Тип пристрою' value={type_device} onChange={(e) => setModelDevice(e.target.value)} />
                <input placeholder='Назва пристрою' value={name_device} onChange={(e) => setNameDevice(e.target.value)} />
                <button onClick={handlePostDevice}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(devices) && devices.map((devices) => (
                        <ItemDevice
                            device={{ ...devices }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default DeviceList;
