import React, { useEffect, useState } from 'react'
import ItemMouse from '../../items/sysadmin/ItemMouse';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';

function GridMouse({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [mouses, setMouses] = useState(null);
    const [name_mouse, setNameMouse] = useState('');
    const [quantity_mouse, setQuantityMouse] = useState('');

    const handlePostMouse = async () => {

        if (quantity_mouse < 1) {
            Swal.fire({
                icon: 'error',
                text: 'Кількість не може бути < 1',
            })
            return;
        }

        if (!name_mouse || !quantity_mouse) {
            Swal.fire({
                icon: 'error',
                text: 'Назва або кількість відсутні',
            })
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/post-mouse', {
                name_mouse: name_mouse,
                quantity_mouse: quantity_mouse
            });
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting Mouse:', error);
            setError('Error posting Mouse');
        }
    };

    useEffect(() => {
        async function fetchMouse() {
            try {
                const response = await axios.get('http://localhost:5001/get-mouse');
                setMouses(response.data);
            } catch (error) {
                console.error('Error fetching Mouses:', error);
                setError('Error fetching Mouses');
            }
        }

        fetchMouse();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!mouses) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='mouse'>
            <div className='workview-controls'>
                <input placeholder='Назва миші' value={name_mouse} onChange={(e) => setNameMouse(e.target.value)} />
                <input placeholder='Кількість' type='number' value={quantity_mouse} onChange={(e) => setQuantityMouse(e.target.value)} />
                <button onClick={handlePostMouse}>Додати</button>
            </div>
            <div className='grid'>
                {
                    Array.isArray(mouses) && mouses.map((mouses) => (
                        <ItemMouse
                            mouse={{ ...mouses }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GridMouse;
