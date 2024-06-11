import React, { useEffect, useState } from 'react'
import ItemHDD from '../../items/sysadmin/ItemHDD';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridHDD({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [hdds, setHDDs] = useState(null);
    const [name_hdd, setNameHDD] = useState('');
    const [quantity_hdd, setQuantityHDD] = useState('');

    const handlePostHDD = async () => {

        if (quantity_hdd < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_hdd || !quantity_hdd) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-hdd', {
                name_hdd: name_hdd,
                quantity_hdd: quantity_hdd
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting HDD:', error);
            setError('Error posting HDD');
        }
    };

    useEffect(() => {
        async function fetchHDD() {
            try {
                const response = await axios.get('http://localhost:5001/get-hdd');
                setHDDs(response.data);
            } catch (error) {
                console.error('Error fetching HDDs:', error);
                setError('Error fetching HDDs');
            }
        }

        fetchHDD();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!hdds) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='hdd'>
            <div className='workview-controls'>
                <input placeholder='Назва жорсткого диску' value={name_hdd} onChange={(e) => setNameHDD(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_hdd} onChange={(e) => setQuantityHDD(e.target.value)} />
                <button onClick={handlePostHDD}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(hdds) && hdds.map((hdds) => (
                        <ItemHDD
                            hdd={{ ...hdds }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridHDD;
