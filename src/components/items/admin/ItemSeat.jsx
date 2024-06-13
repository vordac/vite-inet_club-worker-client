import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemSeat({ update, setUpdate, seat, getDeviceName }) {
    const { id_seat, number_seat, id_device, status_seat } = seat;

    const handleDeleteSeat = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-seat/${id_seat}`);
                } catch (error) {
                    console.error('Error deleting Seat:', error);
                    setError('Error deleting Seat');
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

    const handleFreeClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/put-seat/Вільне/${id_seat}`, {
                status_seat_new: "Вільне",
                id_seat: id_seat
            });
            setUpdate(update += 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOccupyClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/put-seat/Зайняте/${id_seat}`, {
                status_seat_new: "Зайняте",
                id_seat: id_seat
            });
            setUpdate(update += 1);
        } catch (error) {
            console.log(error);
        }
    }

    if (status_seat === "Вільне") {
        return (
            <Card className="item">
                <div className='item-controls'>
                    <button onClick={handleDeleteSeat}>
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </div>
                <Card.Text className='item-id'><b>ID:</b> {id_seat}</Card.Text>
                <Card.Text className='item-number'><b>Номер: </b>{number_seat}</Card.Text>
                <Card.Text className='item-device'><b>Пристрій:</b> {getDeviceName(id_device)}</Card.Text>
                <Card.Text className='item-status'><b>Статус:</b> {status_seat}</Card.Text>
                <button onClick={handleOccupyClick}>Зайняти місце</button>
            </Card>
        );
    } else {
        return (
            <Card className="item">
                <div className='item-controls'>
                    <button onClick={handleDeleteSeat}>
                        <FontAwesomeIcon icon={faRemove} />
                    </button>
                </div>
                <Card.Text className='item-id'><b>ID:</b> {id_seat}</Card.Text>
                <Card.Text className='item-number'><b>Номер: </b>{number_seat}</Card.Text>
                <Card.Text className='item-device'><b>Пристрій:</b> {getDeviceName(id_device)}</Card.Text>
                <Card.Text className='item-status'><b>Статус:</b> {status_seat}</Card.Text>
                <button onClick={handleFreeClick}>Звільнити місце</button>
            </Card>
        );
    }
}

export default ItemSeat;