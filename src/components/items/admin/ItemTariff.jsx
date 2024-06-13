import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemTariff({ update, setUpdate, tariff }) {
    const { id_tariff, name_tariff, price_tariff } = tariff;

    const handleDeleteTariff = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-tariff/${id_tariff}`);
                } catch (error) {
                    console.error('Error deleting Tariff:', error);
                    setError('Error deleting Tariff');
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
                <button onClick={handleDeleteTariff}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_tariff}</Card.Text>
            <Card.Text className='item-name'><b>Назва: </b>{name_tariff}</Card.Text>
            <Card.Text className='item-quantity'><b>Ціна:</b> {price_tariff}</Card.Text>
        </Card>
    );
}

export default ItemTariff;