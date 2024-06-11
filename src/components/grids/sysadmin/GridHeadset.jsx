import React, { useEffect, useState } from 'react'
import ItemHeadset from '../../items/sysadmin/ItemHeadset';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridHeadset({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [headsets, setHeadsets] = useState(null);
    const [name_headset, setNameHeadset] = useState('');
    const [quantity_headset, setQuantityHeadset] = useState('');

    const handlePostHeadset = async () => {

        if (quantity_headset < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_headset || !quantity_headset) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-headset', {
                name_headset: name_headset,
                quantity_headset: quantity_headset
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Headset:', error);
            setError('Error posting Headset');
        }
    };

    useEffect(() => {
        async function fetchHeadset() {
            try {
                const response = await axios.get('http://localhost:5001/get-headset');
                setHeadsets(response.data);
            } catch (error) {
                console.error('Error fetching Headsets:', error);
                setError('Error fetching Headsets');
            }
        }

        fetchHeadset();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!headsets) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='headset'>
            <div className='workview-controls'>
                <input placeholder='Назва навушників' value={name_headset} onChange={(e) => setNameHeadset(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_headset} onChange={(e) => setQuantityHeadset(e.target.value)} />
                <button onClick={handlePostHeadset}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(headsets) && headsets.map((headsets) => (
                        <ItemHeadset
                            headset={{ ...headsets }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridHeadset;
