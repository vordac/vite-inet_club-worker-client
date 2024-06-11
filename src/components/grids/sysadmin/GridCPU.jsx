import React, { useEffect, useState } from 'react'
import ItemCPU from '../../items/sysadmin/ItemCPU';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridCPU({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [cpus, setCPUs] = useState(null);
    const [name_cpu, setNameCPU] = useState('');
    const [quantity_cpu, setQuantityCPU] = useState('');

    const handlePostCPU = async () => {

        if (quantity_cpu < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_cpu || !quantity_cpu) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-cpu', {
                name_cpu: name_cpu,
                quantity_cpu: quantity_cpu
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting CPU:', error);
            setError('Error posting CPU');
        }
    };

    useEffect(() => {
        async function fetchCPU() {
            try {
                const response = await axios.get('http://localhost:5001/get-cpu');
                setCPUs(response.data);
            } catch (error) {
                console.error('Error fetching CPUs:', error);
                setError('Error fetching CPUs');
            }
        }

        fetchCPU();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!cpus) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='cpu'>
            <div className='workview-controls'>
                <input placeholder='Назва процесору' value={name_cpu} onChange={(e) => setNameCPU(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_cpu} onChange={(e) => setQuantityCPU(e.target.value)} />
                <button onClick={handlePostCPU}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(cpus) && cpus.map((cpus) => (
                        <ItemCPU
                            cpu={{ ...cpus }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridCPU;
