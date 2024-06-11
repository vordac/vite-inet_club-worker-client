import React, { useEffect, useState } from 'react'
import ItemMonitor from '../../items/sysadmin/ItemMonitor';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridMonitor({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [monitors, setMonitors] = useState(null);
    const [name_monitor, setNameMonitor] = useState('');
    const [quantity_monitor, setQuantityMonitor] = useState('');

    const handlePostMonitor = async () => {

        if (quantity_monitor < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_monitor || !quantity_monitor) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-monitor', {
                name_monitor: name_monitor,
                quantity_monitor: quantity_monitor
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Monitor:', error);
            setError('Error posting Monitor');
        }
    };

    useEffect(() => {
        async function fetchMonitor() {
            try {
                const response = await axios.get('http://localhost:5001/get-monitor');
                setMonitors(response.data);
            } catch (error) {
                console.error('Error fetching Monitors:', error);
                setError('Error fetching Monitors');
            }
        }

        fetchMonitor();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!monitors) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='monitor'>
            <div className='workview-controls'>
                <input placeholder='Назва монітору' value={name_monitor} onChange={(e) => setNameMonitor(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_monitor} onChange={(e) => setQuantityMonitor(e.target.value)} />
                <button onClick={handlePostMonitor}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(monitors) && monitors.map((monitors) => (
                        <ItemMonitor
                            monitor={{ ...monitors }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridMonitor;
