import React, { useEffect, useState } from 'react'
import '../css/workview.css';

import GridComputer from '../../grids/sysadmin/GridComputer';
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
                    <div className='workview-controls'>
                        <button>1</button>
                    </div>
                    <div className='workview-content'>
                        <GridComputer />
                    </div>
                </div>
            )
        } else if (tab === 2) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>2</button>
                    </div>
                    <div className='workview-content'>
                        <GridConsole />
                    </div>
                </div>
            )
        } else if (tab === 3) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>3</button>
                    </div>
                    <div className='workview-content'>
                        <GridCPU />
                    </div>
                </div>
            )
        } else if (tab === 4) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>4</button>
                    </div>
                    <div className='workview-content'>
                        <GridGPU />
                    </div>
                </div>
            )
        } else if (tab === 5) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>5</button>
                    </div>
                    <div className='workview-content'>
                        <GridMotherboard />
                    </div>
                </div>
            )
        } else if (tab === 6) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>6</button>
                    </div>
                    <div className='workview-content'>
                        <GridRAM />
                    </div>
                </div>
            )
        } else if (tab === 7) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>7</button>
                    </div>
                    <div className='workview-content'>
                        <GridHDD />
                    </div>
                </div>
            )
        } else if (tab === 8) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>8</button>
                    </div>
                    <div className='workview-content'>
                        <GridSSD />
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
                    <div className='workview-controls'>
                        <button>10</button>
                    </div>
                    <div className='workview-content'>
                        <GridPower />
                    </div>
                </div>
            )
        } else if (tab === 11) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>11</button>
                    </div>
                    <div className='workview-content'>
                        <GridUnit />
                    </div>
                </div>
            )
        } else if (tab === 12) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>12</button>
                    </div>
                    <div className='workview-content'>
                        <GridMonitor />
                    </div>
                </div>
            )
        } else if (tab === 13) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>13</button>
                    </div>
                    <div className='workview-content'>
                        <GridMouse />
                    </div>
                </div>
            )
        } else if (tab === 14) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>14</button>
                    </div>
                    <div className='workview-content'>
                        <GridKeyboard />
                    </div>
                </div>
            )
        } else if (tab === 15) {
            return (
                <div className='workview'>
                    <div className='workview-controls'>
                        <button>15</button>
                    </div>
                    <div className='workview-content'>
                        <GridHeadset />
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