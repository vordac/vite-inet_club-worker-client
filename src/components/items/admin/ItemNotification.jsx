import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemNotification({ update, setUpdate, notification }) {
    const { id_notification, phone, date, status } = notification;

    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const handleDeleteNotification = async () => {
        Swal.fire({
            title: 'Підтвердіть видалення',
            text: 'Ви не зможете повернути запис',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Так, видалити',
            cancelButtonText: 'Ні, відмінити',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5001/delete-notification/${id_notification}`);
                } catch (error) {
                    console.error('Error deleting Notification:', error);
                    setError('Error deleting Notification');
                }
                Swal.fire({
                    icon: 'success',
                    text: 'Успішно видалено запис',
                })
                setUpdate(update += 1);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        })
    }

    const handleNewClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/put-notification/Нове/${id_notification}`, {
                status_new: "Нове",
                id_notification: id_notification
            });
            setUpdate(update += 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleArchiveClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/put-notification/Архів/${id_notification}`, {
                status_new: "Архів",
                id_notification: id_notification
            });
            setUpdate(update += 1);
        } catch (error) {
            console.log(error);
        }
    }

    if (status === "Нове") {
        return (
            <Card className="item">
                <div className='item-controls'>
                    <button onClick={handleDeleteNotification}>
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </div>
                <Card.Text className='item-id'><b>ID:</b> {id_notification}</Card.Text>
                <Card.Text className='item-number'><b>Номер: </b>{phone}</Card.Text>
                <Card.Text className='item-date'><b>Дата:</b> {formattedDate}</Card.Text>
                <Card.Text className='item-status'><b>Статус:</b> {status}</Card.Text>
                <button onClick={handleArchiveClick}>Архівувати</button>
            </Card>
        );
    } else {
        return (
            <Card className="item">
                <div className='item-controls'>
                    <button onClick={handleDeleteNotification}>
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </div>
                <Card.Text className='item-id'><b>ID:</b> {id_notification}</Card.Text>
                <Card.Text className='item-number'><b>Номер: </b>{phone}</Card.Text>
                <Card.Text className='item-date'><b>Дата:</b> {formattedDate}</Card.Text>
                <Card.Text className='item-status'><b>Статус:</b> {status}</Card.Text>
                <button onClick={handleNewClick}>Змінити на "Нове"</button>
            </Card>
        );
    }
}

export default ItemNotification;