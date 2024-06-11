import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemCPU({ update, setUpdate, cpu }) {
    const { id_cpu, name_cpu, quantity_cpu } = cpu;

    const handleDeleteCPU = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-cpu/${id_cpu}`);
                } catch (error) {
                    console.error('Error deleting CPU:', error);
                    setError('Error deleting CPU');
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
                <button onClick={handleDeleteCPU}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_cpu}</Card.Text>
            <Card.Text className='item-name'><b>Назва: </b>{name_cpu}</Card.Text>
            <Card.Text className='item-quantity'><b>Кількість:</b> {quantity_cpu}</Card.Text>
        </Card>
    );
}

export default ItemCPU;