import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemGPU({ update, setUpdate, gpu }) {
    const { id_gpu, name_gpu, quantity_gpu } = gpu;

    const handleDeleteGPU = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-gpu/${id_gpu}`);
                } catch (error) {
                    console.error('Error deleting GPU:', error);
                    setError('Error deleting GPU');
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
                <button onClick={handleDeleteGPU}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_gpu}</Card.Text>
            <Card.Text className='item-name'><b>Назва: </b>{name_gpu}</Card.Text>
            <Card.Text className='item-quantity'><b>Кількість:</b> {quantity_gpu}</Card.Text>
        </Card>
    );
}

export default ItemGPU;