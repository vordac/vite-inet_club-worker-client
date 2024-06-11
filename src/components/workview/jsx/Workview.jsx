import React, { useEffect, useState } from 'react'
import '../css/workview.css';

import GridPC from '../../grids/sysadmin/GridPC';
import GridConsole from '../../grids/sysadmin/GridConsole';
import GridCooling from '../../grids/sysadmin/GridCooling';
import GridCPU from '../../grids/sysadmin/GridCPU';
import GridGPU from '../../grids/sysadmin/GridGPU';
import GridHDD from '../../grids/sysadmin/GridHDD';
import GridHeadset from '../../grids/sysadmin/GridHeadset';
import GridKeyboard from '../../grids/sysadmin/GridKeyboard';
import GridMonitor from '../../grids/sysadmin/GridMonitor';
import GridMotherboard from '../../grids/sysadmin/GridMotherboard';
import GridMouse from '../../grids/sysadmin/GridMouse';
import GridPower from '../../grids/sysadmin/GridPower';
import GridRAM from '../../grids/sysadmin/GridRAM';
import GridSSD from '../../grids/sysadmin/GridSSD';
import GridUnit from '../../grids/sysadmin/GridUnit';

function Workview({ role, tab, update, setUpdate }) {

    useEffect(() => {

    }, [tab]);

    if (role === "director") {
        return (
            <div className='workview'>
                <div className='workview-content'>{role}</div>
            </div>
        )
    } else if (role === "sysadmin") {
        if (tab === 1) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridPC update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 2) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridConsole update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 3) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridCPU update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 4) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridGPU update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 5) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridMotherboard update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 6) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridRAM update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 7) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridHDD update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 8) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridSSD update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 9) {
            return (
                <div className='workview'>
                    <GridCooling update={update} setUpdate={setUpdate} />
                </div>
            )
        } else if (tab === 10) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridPower update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 11) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridUnit update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 12) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridMonitor update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 13) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridMouse />
                    </div>
                </div>
            )
        } else if (tab === 14) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridKeyboard update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        } else if (tab === 15) {
            return (
                <div className='workview'>
                    <div className='workview-content'>
                        <GridHeadset update={update} setUpdate={setUpdate} />
                    </div>
                </div>
            )
        }
    } else if (role === "admin") {
        return (
            <div className='workview'>
                <div className='workview-content'>{role}</div>
            </div>
        )
    } else {
        return (
            <div className='workview'>
                <div className='workview-content'>У Вас немає доступу</div>
            </div>
        )
    }
}

export default Workview;