import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemConsole({ update, setUpdate, console }) {
    const { id_console, name_console, model_console, quantity_console } = console;

    const handleDeleteConsole = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-console/${id_console}`);
                } catch (error) {
                    console.error('Error deleting console:', error);
                    setError('Error deleting console');
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
                <button onClick={handleDeleteConsole}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_console}</Card.Text>
            <Card.Text className='item-name'><b>Назва: </b>{name_console}</Card.Text>
            <Card.Text className='item-name'><b>Модель: </b>{model_console}</Card.Text>
            <Card.Text className='item-quantity'><b>Кількість: </b> {quantity_console}</Card.Text>
        </Card>
    );
}

export default ItemConsole;