import React, { useEffect, useState } from 'react'
import '../css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function Header({ role, setRole, sidebarVisible, setSidebarVisible }) {


    const handleLogout = () => {

    }

    const handleBurger = () => {
        setSidebarVisible(!sidebarVisible);
    }

    if (role === "director") {
        return (
            <div className='header'>
                <div className='header-burger'>
                    <p>Директор</p>
                </div>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Адміністратор</option>
                    <option value="sysadmin">Системний адміністратор</option>
                </select>
            </div>
        )
    } else if (role === "sysadmin") {
        return (
            <div className='header'>
                <div className='header-burger'>
                    <p>Сисадмін</p>
                </div>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="sysadmin">Системний адміністратор</option>
                    <option value="admin">Адміністратор</option>
                </select>
            </div>
        )
    } else if (role === "admin") {
        return (
            <div className='header'>
                <div className='header-burger'>
                    <p>Адміністратор</p>
                </div>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Адміністратор</option>
                    <option value="sysadmin">Системний адміністратор</option>
                </select>
            </div>
        )
    } else {
        return (
            <>У вас немає доступу</>
        )
    }
}

export default Header;