import React, { useEffect, useState } from 'react'
import ItemConsole from '../../items/sysadmin/ItemConsole';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function GridConsole({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [consoles, setConsoles] = useState(null);
    const [name_console, setNameConsole] = useState('');
    const [model_console, setModelConsole] = useState('');
    const [quantity_console, setQuantityConsole] = useState('');

    const handlePostConsole = async () => {

        if (!name_console) {
            Swal.fire({
                icon: 'error',
                text: 'Назва відсутня',
            })
            return;
        }

        if (!model_console) {
            Swal.fire({
                icon: 'error',
                text: 'Модель відсутня',
            })
            return;
        }

        if (quantity_console < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-console', {
                name_console: name_console,
                model_console: model_console,
                quantity_console: quantity_console
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting console:', error);
            setError('Error posting console');
        }
    };

    useEffect(() => {
        async function fetchConsole() {
            try {
                const response = await axios.get('http://localhost:5001/get-console');
                setConsoles(response.data);
            } catch (error) {
                console.error('Error fetching console:', error);
                setError('Error fetching console');
            }
        }

        fetchConsole();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!consoles) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='console'>
            <div className='workview-controls'>
                <input placeholder='Назва консолі' value={name_console} onChange={(e) => setNameConsole(e.target.value)} />
                <input placeholder='Модель консолі' value={model_console} onChange={(e) => setModelConsole(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_console} onChange={(e) => setQuantityConsole(e.target.value)} />
                <button onClick={handlePostConsole}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(consoles) && consoles.map((consoles) => (
                        <ItemConsole
                            console={{ ...consoles }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridConsole;
