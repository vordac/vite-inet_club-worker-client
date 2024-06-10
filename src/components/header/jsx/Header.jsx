import React, { useEffect, useState } from 'react'
import '../css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function Header({ role, sidebarVisible, setSidebarVisible }) {


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
                <div className='header-logout'>
                    <button onClick={handleLogout}>Вийти</button>
                </div>

            </div>
        )
    } else if (role === "sysadmin") {
        return (
            <div className='header'>
                <div className='header-burger'>
                    <p>Системний Адміністратор</p>
                </div>
                <div className='header-logout'>
                    <button onClick={handleLogout}>Вийти</button>
                </div>
            </div>
        )
    } else if (role === "admin") {
        return (
            <div className='header'>
                <div className='header-burger'>
                    <p>Адміністратор</p>
                </div>
                <div className='header-logout'>
                    <button onClick={handleLogout}>Вийти</button>
                </div>
            </div>
        )
    } else {
        return (
            <>У вас немає доступу</>
        )
    }
}

export default Header;