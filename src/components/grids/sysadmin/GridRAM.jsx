import React, { useEffect, useState } from 'react'
import ItemRAM from '../../items/sysadmin/ItemRAM';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridRAM({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [rams, setRAMs] = useState(null);
    const [name_ram, setNameRAM] = useState('');
    const [quantity_ram, setQuantityRAM] = useState('');

    const handlePostRAM = async () => {

        if (quantity_ram < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_ram || !quantity_ram) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-ram', {
                name_ram: name_ram,
                quantity_ram: quantity_ram
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting RAM:', error);
            setError('Error posting RAM');
        }
    };

    useEffect(() => {
        async function fetchRAM() {
            try {
                const response = await axios.get('http://localhost:5001/get-ram');
                setRAMs(response.data);
            } catch (error) {
                console.error('Error fetching RAMs:', error);
                setError('Error fetching RAMs');
            }
        }

        fetchRAM();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!rams) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='ram'>
            <div className='workview-controls'>
                <input placeholder="Назва оперативної пам'яті" value={name_ram} onChange={(e) => setNameRAM(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_ram} onChange={(e) => setQuantityRAM(e.target.value)} />
                <button onClick={handlePostRAM}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(rams) && rams.map((rams) => (
                        <ItemRAM
                            ram={{ ...rams }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridRAM;
