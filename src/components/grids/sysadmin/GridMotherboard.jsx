import React, { useEffect, useState } from 'react'
import ItemMotherboard from '../../items/sysadmin/ItemMotherboard';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridMotherboard({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [motherboards, setMotherboards] = useState(null);
    const [name_motherboard, setNameMotherboard] = useState('');
    const [quantity_motherboard, setQuantityMotherboard] = useState('');

    const handlePostMotherboard = async () => {

        if (quantity_motherboard < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_motherboard || !quantity_motherboard) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-motherboard', {
                name_motherboard: name_motherboard,
                quantity_motherboard: quantity_motherboard
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Motherboard:', error);
            setError('Error posting Motherboard');
        }
    };

    useEffect(() => {
        async function fetchMotherboard() {
            try {
                const response = await axios.get('http://localhost:5001/get-motherboard');
                setMotherboards(response.data);
            } catch (error) {
                console.error('Error fetching Motherboards:', error);
                setError('Error fetching Motherboards');
            }
        }

        fetchMotherboard();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!motherboards) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='motherboard'>
            <div className='workview-controls'>
                <input placeholder='Назва материнської плати' value={name_motherboard} onChange={(e) => setNameMotherboard(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_motherboard} onChange={(e) => setQuantityMotherboard(e.target.value)} />
                <button onClick={handlePostMotherboard}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(motherboards) && motherboards.map((motherboards) => (
                        <ItemMotherboard
                            motherboard={{ ...motherboards }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridMotherboard;
