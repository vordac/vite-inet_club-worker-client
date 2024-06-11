import React, { useEffect, useState } from 'react'
import ItemCooling from '../../items/sysadmin/ItemCooling';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function GridCooling({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [coolings, setCoolings] = useState(null);
    const [name_cooling, setNameCooling] = useState('');
    const [quantity_cooling, setQuantityCooling] = useState('');

    const handlePostCooling = async () => {

        if (quantity_cooling < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_cooling || !quantity_cooling) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-cooling', {
                name_cooling: name_cooling,
                quantity_cooling: quantity_cooling
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting cooling:', error);
            setError('Error posting cooling');
        }
    };

    useEffect(() => {
        async function fetchCooling() {
            try {
                const response = await axios.get('http://localhost:5001/get-cooling');
                setCoolings(response.data);
            } catch (error) {
                console.error('Error fetching cooling:', error);
                setError('Error fetching cooling');
            }
        }

        fetchCooling();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!coolings) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='cooling'>
            <div className='workview-controls'>
                <input placeholder='Назва охолодження' value={name_cooling} onChange={(e) => setNameCooling(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_cooling} onChange={(e) => setQuantityCooling(e.target.value)} />
                <button onClick={handlePostCooling}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(coolings) && coolings.map((coolings) => (
                        <ItemCooling
                            cooling={{ ...coolings }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridCooling;
