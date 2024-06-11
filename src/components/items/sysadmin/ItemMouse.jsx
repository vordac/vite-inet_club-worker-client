import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemMouse({ update, setUpdate, mouse }) {
    const { id_mouse, name_mouse, quantity_mouse } = mouse;

    const handleDeleteMouse = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-mouse/${id_mouse}`);
                } catch (error) {
                    console.error('Error deleting Mouse:', error);
                    setError('Error deleting Mouse');
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
                <button onClick={handleDeleteMouse}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_mouse}</Card.Text>
            <Card.Text className='item-name'><b>Назва: </b>{name_mouse}</Card.Text>
            <Card.Text className='item-quantity'><b>Кількість:</b> {quantity_mouse}</Card.Text>
        </Card>
    );
}

export default ItemMouse;