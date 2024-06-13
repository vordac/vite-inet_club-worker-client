import React, { useEffect, useState } from 'react'
import ItemNotification from '../../items/admin/ItemNotification';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/list.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function NotificationList({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        async function fetchNotification() {
            try {
                const response = await axios.get('http://localhost:5001/get-notification');
                setNotifications(response.data);
            } catch (error) {
                notifications.error('Error fetching notification:', error);
                setError('Error fetching notification');
            }
        }

        fetchNotification();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!notifications) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='notification'>
            <div className='grid'>
                {
                    Array.isArray(notifications) && notifications.map((notifications) => (
                        <ItemNotification
                            notification={{ ...notifications }}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default NotificationList;
