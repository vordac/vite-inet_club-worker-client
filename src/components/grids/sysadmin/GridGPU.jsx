import React, { useEffect, useState } from 'react'
import ItemGPU from '../../items/sysadmin/ItemGPU';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridGPU({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [gpus, setGPUs] = useState(null);
    const [name_gpu, setNameGPU] = useState('');
    const [quantity_gpu, setQuantityGPU] = useState('');

    const handlePostGPU = async () => {

        if (quantity_gpu < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_gpu || !quantity_gpu) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-gpu', {
                name_gpu: name_gpu,
                quantity_gpu: quantity_gpu
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting GPU:', error);
            setError('Error posting GPU');
        }
    };

    useEffect(() => {
        async function fetchGPU() {
            try {
                const response = await axios.get('http://localhost:5001/get-gpu');
                setGPUs(response.data);
            } catch (error) {
                console.error('Error fetching GPUs:', error);
                setError('Error fetching GPUs');
            }
        }

        fetchGPU();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!gpus) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='gpu'>
            <div className='workview-controls'>
                <input placeholder='Назва відеокарти' value={name_gpu} onChange={(e) => setNameGPU(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_gpu} onChange={(e) => setQuantityGPU(e.target.value)} />
                <button onClick={handlePostGPU}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(gpus) && gpus.map((gpus) => (
                        <ItemGPU
                            gpu={{ ...gpus }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridGPU;
