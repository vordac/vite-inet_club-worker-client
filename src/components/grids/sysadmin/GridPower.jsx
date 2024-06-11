import React, { useEffect, useState } from 'react'
import ItemPower from '../../items/sysadmin/ItemPower';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridPower({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [powers, setPowers] = useState(null);
    const [name_power, setNamePower] = useState('');
    const [quantity_power, setQuantityPower] = useState('');

    const handlePostPower = async () => {

        if (quantity_power < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_power || !quantity_power) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-power', {
                name_power: name_power,
                quantity_power: quantity_power
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Power:', error);
            setError('Error posting Power');
        }
    };

    useEffect(() => {
        async function fetchPower() {
            try {
                const response = await axios.get('http://localhost:5001/get-power');
                setPowers(response.data);
            } catch (error) {
                console.error('Error fetching Powers:', error);
                setError('Error fetching Powers');
            }
        }

        fetchPower();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!powers) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='power'>
            <div className='workview-controls'>
                <input placeholder='Назва блоку живлення' value={name_power} onChange={(e) => setNamePower(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_power} onChange={(e) => setQuantityPower(e.target.value)} />
                <button onClick={handlePostPower}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(powers) && powers.map((powers) => (
                        <ItemPower
                            power={{ ...powers }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridPower;
