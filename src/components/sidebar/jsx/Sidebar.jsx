import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'

function Sidebar({ role, tab, setTab }) {

    const handleTabClick = (tabName) => {
        setTab(tabName);
        console.log(tab);
    }

    if (role === "director") {

        return (
            <div className={`aside`}>
                <button onClick={() => handleTabClick(1)}>Комп'ютери</button>
                <button onClick={() => handleTabClick(2)}>Консолі</button>
                <button onClick={() => handleTabClick(3)}>Процесори</button>
                <button onClick={() => handleTabClick(4)}>Відеокарти</button>
                <button onClick={() => handleTabClick(5)}>Материнські плати</button>
                <button onClick={() => handleTabClick(6)}>Оперативна пам'ять</button>
                <button onClick={() => handleTabClick(7)}>Жорсткі диски</button>
                <button onClick={() => handleTabClick(8)}>SSD</button>
                <button onClick={() => handleTabClick(9)}>Охолодження</button>
                <button onClick={() => handleTabClick(10)}>Блоки живлення</button>
                <button onClick={() => handleTabClick(11)}>Корпуси</button>
                <button onClick={() => handleTabClick(12)}>Монітори</button>
                <button onClick={() => handleTabClick(13)}>Миші</button>
                <button onClick={() => handleTabClick(14)}>Клавіатури</button>
                <button onClick={() => handleTabClick(15)}>Навушники</button>
            </div>
        )
    } else if (role === "sysadmin") {



        return (
            <div className={`aside`}>
                <button onClick={() => handleTabClick(1)}>Комп'ютери</button>
                <button onClick={() => handleTabClick(2)}>Консолі</button>
                <button onClick={() => handleTabClick(3)}>Процесори</button>
                <button onClick={() => handleTabClick(4)}>Відеокарти</button>
                <button onClick={() => handleTabClick(5)}>Материнські плати</button>
                <button onClick={() => handleTabClick(6)}>Оперативна пам'ять</button>
                <button onClick={() => handleTabClick(7)}>Жорсткі диски</button>
                <button onClick={() => handleTabClick(8)}>SSD</button>
                <button onClick={() => handleTabClick(9)}>Охолодження</button>
                <button onClick={() => handleTabClick(10)}>Блоки живлення</button>
                <button onClick={() => handleTabClick(11)}>Корпуси</button>
                <button onClick={() => handleTabClick(12)}>Монітори</button>
                <button onClick={() => handleTabClick(13)}>Миші</button>
                <button onClick={() => handleTabClick(14)}>Клавіатури</button>
                <button onClick={() => handleTabClick(15)}>Навушники</button>
            </div>
        )
    } else if (role === "admin") {

        return (
            <div className={`aside`}>
                <button onClick={() => handleTabClick(1)}>Комп'ютери</button>
                <button onClick={() => handleTabClick(2)}>Консолі</button>
                <button onClick={() => handleTabClick(3)}>Процесори</button>
                <button onClick={() => handleTabClick(4)}>Відеокарти</button>
                <button onClick={() => handleTabClick(5)}>Материнські плати</button>
                <button onClick={() => handleTabClick(6)}>Оперативна пам'ять</button>
                <button onClick={() => handleTabClick(7)}>Жорсткі диски</button>
                <button onClick={() => handleTabClick(8)}>SSD</button>
                <button onClick={() => handleTabClick(9)}>Охолодження</button>
                <button onClick={() => handleTabClick(10)}>Блоки живлення</button>
                <button onClick={() => handleTabClick(11)}>Корпуси</button>
                <button onClick={() => handleTabClick(12)}>Монітори</button>
                <button onClick={() => handleTabClick(13)}>Миші</button>
                <button onClick={() => handleTabClick(14)}>Клавіатури</button>
                <button onClick={() => handleTabClick(15)}>Навушники</button>
            </div>
        )
    } else {
        return (
            <>У вас немає доступу</>
        )
    }
}

export default Sidebar;