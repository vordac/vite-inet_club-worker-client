import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemReservation({ update, setUpdate, reservation, getSeatNumber, getTariffName }) {
    const { id_reservation, id_seat, phone, time_start, hours, payment, price, time_end, name_client, id_tariff, people, price_tariff } = reservation;

    const dateObjectStart = new Date(time_start);
    const dateObjectEnd = new Date(time_end);

    const formattedDateStart = dateObjectStart.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formattedDateEnd = dateObjectEnd.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const handleDeleteReservation = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-reservation/${id_reservation}`);
                } catch (error) {
                    console.error('Error deleting Reservation:', error);
                    setError('Error deleting Reservation');
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

    return (
        <Card className="item">
            <div className='item-controls'>
                <button onClick={handleDeleteReservation}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_reservation}</Card.Text>
            <Card.Text className='item-seat'><b>№ місця:</b> {getSeatNumber(id_seat)}</Card.Text>
            <Card.Text className='item-phone'><b>Телефон:</b> {phone}</Card.Text>
            <Card.Text className='item-timestart'><b>Дата початку резервації:</b> {formattedDateStart}</Card.Text>
            <Card.Text className='item-hours'><b>Години:</b> {hours}</Card.Text>
            <Card.Text className='item-payment'><b>Тип оплати: </b> {payment}</Card.Text>
            <Card.Text className='item-price'><b>До оплати, грн: </b> {price}</Card.Text>
            <Card.Text className='item-nameclient'><b>Ім'я клієнта:</b> {name_client}</Card.Text>
            <Card.Text className='item-tariff'><b>Тариф:</b> {getTariffName(id_tariff)}</Card.Text>
            <Card.Text className='item-people'><b>Кількість людей:</b> {people}</Card.Text>
            <Card.Text className='item-tariffprice'><b>Вартість тарифу: </b>{price_tariff}</Card.Text>
        </Card>
    );
}

export default ItemReservation;