import React, { useEffect, useState } from 'react'
import ItemSSD from '../../items/sysadmin/ItemSSD';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridSSD({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [ssds, setSSDs] = useState(null);
    const [name_ssd, setNameSSD] = useState('');
    const [quantity_ssd, setQuantitySSD] = useState('');

    const handlePostSSD = async () => {

        if (quantity_ssd < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_ssd || !quantity_ssd) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-ssd', {
                name_ssd: name_ssd,
                quantity_ssd: quantity_ssd
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting SSD:', error);
            setError('Error posting SSD');
        }
    };

    useEffect(() => {
        async function fetchSSD() {
            try {
                const response = await axios.get('http://localhost:5001/get-ssd');
                setSSDs(response.data);
            } catch (error) {
                console.error('Error fetching SSDs:', error);
                setError('Error fetching SSDs');
            }
        }

        fetchSSD();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!ssds) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='ssd'>
            <div className='workview-controls'>
                <input placeholder='Назва SSD' value={name_ssd} onChange={(e) => setNameSSD(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_ssd} onChange={(e) => setQuantitySSD(e.target.value)} />
                <button onClick={handlePostSSD}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(ssds) && ssds.map((ssds) => (
                        <ItemSSD
                            ssd={{ ...ssds }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridSSD;
