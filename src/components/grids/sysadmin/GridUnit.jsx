import React, { useEffect, useState } from 'react'
import ItemUnit from '../../items/sysadmin/ItemUnit';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridUnit({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [units, setUnits] = useState(null);
    const [name_unit, setNameUnit] = useState('');
    const [quantity_unit, setQuantityUnit] = useState('');

    const handlePostUnit = async () => {

        if (quantity_unit < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_unit || !quantity_unit) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-unit', {
                name_unit: name_unit,
                quantity_unit: quantity_unit
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Unit:', error);
            setError('Error posting Unit');
        }
    };

    useEffect(() => {
        async function fetchUnit() {
            try {
                const response = await axios.get('http://localhost:5001/get-unit');
                setUnits(response.data);
            } catch (error) {
                console.error('Error fetching Units:', error);
                setError('Error fetching Units');
            }
        }

        fetchUnit();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!units) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='unit'>
            <div className='workview-controls'>
                <input placeholder='Назва корпусу' value={name_unit} onChange={(e) => setNameUnit(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_unit} onChange={(e) => setQuantityUnit(e.target.value)} />
                <button onClick={handlePostUnit}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(units) && units.map((units) => (
                        <ItemUnit
                            unit={{ ...units }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridUnit;
