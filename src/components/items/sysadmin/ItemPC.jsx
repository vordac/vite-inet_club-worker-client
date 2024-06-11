import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/item.css';

function ItemPC({ update, setUpdate, pc, getCPUName, getGPUName, getMotherboardName, getRAMName, getHDDName, getSSDName, getCoolingName, getPowerName, getUnitName, getMonitorName, getMouseName, getKeyboardName, getHeadsetName }) {
    const { id_pc, name_pc, id_cpu, id_gpu, id_motherboard, id_ram, id_hdd, id_ssd, id_cooling, id_power, id_unit, id_monitor, id_mouse, id_keyboard, id_headset } = pc;

    const handleDeletePC = async () => {
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
                    const response = await axios.delete(`http://localhost:5001/delete-pc/${id_pc}`);
                } catch (error) {
                    console.error('Error deleting pc:', error);
                    setError('Error deleting pc');
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
                <button onClick={handleDeletePC}>
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </div>
            <Card.Text className='item-id'><b>ID:</b> {id_pc}</Card.Text>
            <Card.Text className='item-name'><b>Назва:</b> {name_pc}</Card.Text>
            <Card.Text className='item-cpu'><b>Процесор:</b> {getCPUName(id_cpu)}</Card.Text>
            <Card.Text className='item-gpu'><b>Відеокарта:</b> {getGPUName(id_gpu)}</Card.Text>
            <Card.Text className='item-motherboard'><b>Материнська плата:</b> {getMotherboardName(id_motherboard)}</Card.Text>
            <Card.Text className='item-ram'><b>Оперативна пам'ять:</b> {getRAMName(id_ram)}</Card.Text>
            <Card.Text className='item-hdd'><b>Жорсткий диск:</b> {getHDDName(id_hdd)}</Card.Text>
            <Card.Text className='item-ssd'><b>SSD:</b> {getSSDName(id_ssd)}</Card.Text>
            <Card.Text className='item-cooling'><b>Охолодження:</b> {getCoolingName(id_cooling)}</Card.Text>
            <Card.Text className='item-power'><b>Блок живлення:</b> {getPowerName(id_power)}</Card.Text>
            <Card.Text className='item-unit'><b>Корпус:</b> {getUnitName(id_unit)}</Card.Text>
            <Card.Text className='item-monitor'><b>Монітор:</b> {getMonitorName(id_monitor)}</Card.Text>
            <Card.Text className='item-mouse'><b>Миша:</b> {getMouseName(id_mouse)}</Card.Text>
            <Card.Text className='item-keyboard'><b>Клавіатура:</b> {getKeyboardName(id_keyboard)}</Card.Text>
            <Card.Text className='item-headset'><b>Навушники:</b> {getHeadsetName(id_headset)}</Card.Text>
        </Card>
    );
}

export default ItemPC;