import React, { useEffect, useState } from 'react'
import ItemKeyboard from '../../items/sysadmin/ItemKeyboard';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridKeyboard({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [keyboards, setKeyboards] = useState(null);
    const [name_keyboard, setNameKeyboard] = useState('');
    const [quantity_keyboard, setQuantityKeyboard] = useState('');

    const handlePostKeyboard = async () => {

        if (quantity_keyboard < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_keyboard || !quantity_keyboard) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-keyboard', {
                name_keyboard: name_keyboard,
                quantity_keyboard: quantity_keyboard
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Keyboard:', error);
            setError('Error posting Keyboard');
        }
    };

    useEffect(() => {
        async function fetchKeyboard() {
            try {
                const response = await axios.get('http://localhost:5001/get-keyboard');
                setKeyboards(response.data);
            } catch (error) {
                console.error('Error fetching Keyboards:', error);
                setError('Error fetching Keyboards');
            }
        }

        fetchKeyboard();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!keyboards) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='keyboard'>
            <div className='workview-controls'>
                <input placeholder='Назва клавіатури' value={name_keyboard} onChange={(e) => setNameKeyboard(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_keyboard} onChange={(e) => setQuantityKeyboard(e.target.value)} />
                <button onClick={handlePostKeyboard}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(keyboards) && keyboards.map((keyboards) => (
                        <ItemKeyboard
                            keyboard={{ ...keyboards }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridKeyboard;
