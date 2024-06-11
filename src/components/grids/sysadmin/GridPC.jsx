import React, { useEffect, useState } from 'react'
import ItemPC from '../../items/sysadmin/ItemPC';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/grid.css';
import { icon, text } from '@fortawesome/fontawesome-svg-core';

function GridPC({ update, setUpdate }) {
    const [error, setError] = useState(null);
    const [pcName, setPcName] = useState('');

    const [pcs, setPCs] = useState([]);
    const [cpus, setCPUs] = useState([]);
    const [gpus, setGPUs] = useState([]);
    const [motherboards, setMotherboards] = useState([]);
    const [rams, setRAMs] = useState([]);
    const [hdds, setHDDs] = useState([]);
    const [ssds, setSSDs] = useState([]);
    const [coolings, setCoolings] = useState([]);
    const [powers, setPowers] = useState([]);
    const [units, setUnits] = useState([]);
    const [monitors, setMonitors] = useState([]);
    const [mouses, setMouses] = useState([]);
    const [keyboards, setKeyboards] = useState([]);
    const [headsets, setHeadsets] = useState([]);

    const [selectedCPU, setSelectedCPU] = useState(null);
    const [selectedGPU, setSelectedGPU] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [selectedRAM, setSelectedRAM] = useState(null);
    const [selectedHDD, setSelectedHDD] = useState(null);
    const [selectedSSD, setSelectedSSD] = useState(null);
    const [selectedCooling, setSelectedCooling] = useState(null);
    const [selectedPower, setSelectedPower] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const [selectedMouse, setSelectedMouse] = useState(null);
    const [selectedKeyboard, setSelectedKeyboard] = useState(null);
    const [selectedHeadset, setSelectedHeadset] = useState(null);


    const getCPUName = (id_cpu) => {
        if (!cpus || !id_cpu) return '';
        const cpu = cpus.find((cpu) => cpu.id_cpu === id_cpu);
        return cpu ? cpu.name_cpu : '';
    };

    const getGPUName = (id_gpu) => {
        if (!gpus || !id_gpu) return '';
        const gpu = gpus.find((gpu) => gpu.id_gpu === id_gpu);
        return gpu ? gpu.name_gpu : '';
    };

    const getMotherboardName = (id_motherboard) => {
        if (!motherboards || !id_motherboard) return '';
        const motherboard = motherboards.find((motherboard) => motherboard.id_motherboard === id_motherboard);
        return motherboard ? motherboard.name_motherboard : '';
    };

    const getRAMName = (id_ram) => {
        if (!rams || !id_ram) return '';
        const ram = rams.find((ram) => ram.id_ram === id_ram);
        return ram ? ram.name_ram : '';
    };

    const getHDDName = (id_hdd) => {
        if (!hdds || !id_hdd) return '';
        const hdd = hdds.find((hdd) => hdd.id_hdd === id_hdd);
        return hdd ? hdd.name_hdd : '';
    };

    const getSSDName = (id_ssd) => {
        if (!ssds || !id_ssd) return '';
        const foundSSD = ssds.find((ssd) => ssd.id_ssd === id_ssd);
        return foundSSD ? foundSSD.name_ssd : '';
    };

    const getCoolingName = (id_cooling) => {
        if (!coolings || !id_cooling) return '';
        const cooling = coolings.find((cooling) => cooling.id_cooling === id_cooling);
        return cooling ? cooling.name_cooling : '';
    };

    const getPowerName = (id_power) => {
        if (!powers || !id_power) return '';
        const power = powers.find((power) => power.id_power === id_power);
        return power ? power.name_power : '';
    };

    const getUnitName = (id_unit) => {
        if (!units || !id_unit) return '';
        const unit = units.find((unit) => unit.id_unit === id_unit);
        return unit ? unit.name_unit : '';
    };

    const getMonitorName = (id_monitor) => {
        if (!monitors || !id_monitor) return '';
        const monitor = monitors.find((monitor) => monitor.id_monitor === id_monitor);
        return monitor ? monitor.name_monitor : '';
    };

    const getMouseName = (id_mouse) => {
        if (!mouses || !id_mouse) return '';
        const mouse = mouses.find((mouse) => mouse.id_mouse === id_mouse);
        return mouse ? mouse.name_mouse : '';
    };

    const getKeyboardName = (id_keyboard) => {
        if (!keyboards || !id_keyboard) return '';
        const keyboard = keyboards.find((keyboard) => keyboard.id_keyboard === id_keyboard);
        return keyboard ? keyboard.name_keyboard : '';
    };

    const getHeadsetName = (id_headset) => {
        if (!headsets || !id_headset) return '';
        const headset = headsets.find((headset) => headset.id_headset === id_headset);
        return headset ? headset.name_headset : '';
    };

    useEffect(() => {
        async function fetchCPU() {
            try {
                const response = await axios.get('http://localhost:5001/get-cpu');
                setCPUs(response.data);
            } catch (error) {
                console.error('Error fetching CPUs:', error);
                setError('Error fetching CPUs');
            }
        }

        fetchCPU();
    }, []);

    useEffect(() => {
        async function fetchGPU() {
            try {
                const response = await axios.get('http://localhost:5001/get-gpu');
                setGPUs(response.data);
            } catch (error) {
                console.error('Error fetching GPUs:', error);
                setError('Error fetching GPUs');
            }
        }

        fetchGPU();
    }, []);

    useEffect(() => {
        async function fetchMotherboard() {
            try {
                const response = await axios.get('http://localhost:5001/get-motherboard');
                setMotherboards(response.data);
            } catch (error) {
                console.error('Error fetching Motherboards:', error);
                setError('Error fetching Motherboards');
            }
        }

        fetchMotherboard();
    }, []);

    useEffect(() => {
        async function fetchRAM() {
            try {
                const response = await axios.get('http://localhost:5001/get-ram');
                setRAMs(response.data);
            } catch (error) {
                console.error('Error fetching RAMs:', error);
                setError('Error fetching RAMs');
            }
        }

        fetchRAM();
    }, []);

    useEffect(() => {
        async function fetchHDD() {
            try {
                const response = await axios.get('http://localhost:5001/get-hdd');
                setHDDs(response.data);
            } catch (error) {
                console.error('Error fetching HDDs:', error);
                setError('Error fetching HDDs');
            }
        }

        fetchHDD();
    }, []);

    useEffect(() => {
        async function fetchSSD() {
            try {
                const response = await axios.get('http://localhost:5001/get-ssd');
                setSSDs(response.data);
            } catch (error) {
                console.error('Error fetching SSDs:', error);
                setError('Error fetching SSDs');
            }
        }

        fetchSSD();
    }, []);

    useEffect(() => {
        async function fetchCooling() {
            try {
                const response = await axios.get('http://localhost:5001/get-cooling');
                setCoolings(response.data);
            } catch (error) {
                console.error('Error fetching cooling:', error);
                setError('Error fetching cooling');
            }
        }

        fetchCooling();
    }, []);

    useEffect(() => {
        async function fetchPower() {
            try {
                const response = await axios.get('http://localhost:5001/get-power');
                setPowers(response.data);
            } catch (error) {
                console.error('Error fetching Powers:', error);
                setError('Error fetching Powers');
            }
        }

        fetchPower();
    }, []);

    useEffect(() => {
        async function fetchUnit() {
            try {
                const response = await axios.get('http://localhost:5001/get-unit');
                setUnits(response.data);
            } catch (error) {
                console.error('Error fetching Units:', error);
                setError('Error fetching Units');
            }
        }

        fetchUnit();
    }, []);

    useEffect(() => {
        async function fetchMonitor() {
            try {
                const response = await axios.get('http://localhost:5001/get-monitor');
                setMonitors(response.data);
            } catch (error) {
                console.error('Error fetching Monitors:', error);
                setError('Error fetching Monitors');
            }
        }

        fetchMonitor();
    }, []);

    useEffect(() => {
        async function fetchMouse() {
            try {
                const response = await axios.get('http://localhost:5001/get-mouse');
                setMouses(response.data);
            } catch (error) {
                console.error('Error fetching Mouses:', error);
                setError('Error fetching Mouses');
            }
        }

        fetchMouse();
    }, []);

    useEffect(() => {
        async function fetchKeyboard() {
            try {
                const response = await axios.get('http://localhost:5001/get-keyboard');
                setKeyboards(response.data);
            } catch (error) {
                console.error('Error fetching Keyboards:', error);
                setError('Error fetching Keyboards');
            }
        }

        fetchKeyboard();
    }, []);

    useEffect(() => {
        async function fetchHeadset() {
            try {
                const response = await axios.get('http://localhost:5001/get-headset');
                setHeadsets(response.data);
            } catch (error) {
                console.error('Error fetching Headsets:', error);
                setError('Error fetching Headsets');
            }
        }
        fetchHeadset();
    }, []);

    const handlePostPC = async () => {

        const data = {
            name_pc: pcName,
            id_cpu: selectedCPU,
            id_gpu: selectedGPU,
            id_motherboard: selectedMotherboard,
            id_ram: selectedRAM,
            id_hdd: selectedHDD,
            id_ssd: selectedSSD,
            id_cooling: selectedCooling,
            id_power: selectedPower,
            id_unit: selectedUnit,
            id_monitor: selectedMonitor,
            id_mouse: selectedMouse,
            id_keyboard: selectedKeyboard,
            id_headset: selectedHeadset,
        };

        try {

            if (!pcName) {
                Swal.fire({
                    icon: 'error',
                    text: 'Назву не було введено',
                })
                return;
            }

            if (!selectedCPU) {
                Swal.fire({
                    icon: 'error',
                    text: 'Процесор не було обрано',
                })
                return;
            }

            if (!selectedGPU) {
                Swal.fire({
                    icon: 'error',
                    text: 'Відеокарту не було обрано',
                })
                return;
            }

            if (!selectedMotherboard) {
                Swal.fire({
                    icon: 'error',
                    text: 'Материнську плату не було обрано',
                })
                return;
            }


            if (!selectedRAM) {
                Swal.fire({
                    icon: 'error',
                    text: "Оперативну пам'ять не було обрано",
                })
                return;
            }

            if (!selectedHDD) {
                Swal.fire({
                    icon: 'error',
                    text: 'Жорсткий диск не було обрано',
                })
                return;
            }

            if (!selectedSSD) {
                Swal.fire({
                    icon: 'error',
                    text: 'SSD не було обрано',
                })
                return;
            }

            if (!selectedCooling) {
                Swal.fire({
                    icon: 'error',
                    text: 'Охолодження не було обрано',
                })
                return;
            }

            if (!selectedPower) {
                Swal.fire({
                    icon: 'error',
                    text: 'Блок живлення не було обрано',
                })
                return;
            }

            if (!selectedUnit) {
                Swal.fire({
                    icon: 'error',
                    text: 'Корпус не було обрано',
                })
                return;
            }

            if (!selectedMonitor) {
                Swal.fire({
                    icon: 'error',
                    text: 'Монітор не було обрано',
                })
                return;
            }

            if (!selectedMouse) {
                Swal.fire({
                    icon: 'error',
                    text: 'Мишу не було обрано',
                })
                return;
            }

            if (!selectedKeyboard) {
                Swal.fire({
                    icon: 'error',
                    text: 'Клавіатуру не було обрано',
                })
                return;
            }

            if (!selectedHeadset) {
                Swal.fire({
                    icon: 'error',
                    text: 'Навушники не було обрано',
                })
                return;
            }

            const response = await axios.post('http://localhost:5001/post-pc', data);
            setUpdate(update += 1);
        } catch (error) {
            console.error('Error posting pc:', error);
            setError('Error posting pc');
        }
    };

    useEffect(() => {
        async function fetchPC() {
            try {
                const response = await axios.get('http://localhost:5001/get-pc');
                setPCs(response.data);
            } catch (error) {
                console.error('Error fetching pc:', error);
                setError('Error fetching pc');
            }
        }

        fetchPC();
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!pcs) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className='pc'>
            <div className='workview-controls'>
                <div className='workview-controls-upper'>
                    <input placeholder="Назва ПК" value={pcName} onChange={(e) => setPcName(e.target.value)} />
                    <button onClick={handlePostPC}>Додати</button>
                </div>
                <select value={selectedCPU} onChange={(e) => setSelectedCPU(e.target.value)}>
                    <option value="">Процесор</option>
                    {cpus.map((cpu) => (
                        <option key={cpu.id_cpu} value={cpu.id_cpu}>{cpu.name_cpu}</option>
                    ))}
                </select>

                <select value={selectedGPU} onChange={(e) => setSelectedGPU(e.target.value)}>
                    <option value="">Відеокарта</option>
                    {gpus.map((gpu) => (
                        <option key={gpu.id_gpu} value={gpu.id_gpu}>{gpu.name_gpu}</option>
                    ))}
                </select>

                <select value={selectedMotherboard} onChange={(e) => setSelectedMotherboard(e.target.value)}>
                    <option value="">Материнська плата</option>
                    {motherboards.map((motherboard) => (
                        <option key={motherboard.id_motherboard} value={motherboard.id_motherboard}>{motherboard.name_motherboard}</option>
                    ))}
                </select>

                <select value={selectedRAM} onChange={(e) => setSelectedRAM(e.target.value)}>
                    <option value="">Оперативна пам'ять</option>
                    {rams.map((ram) => (
                        <option key={ram.id_ram} value={ram.id_ram}>{ram.name_ram}</option>
                    ))}
                </select>

                <select value={selectedHDD} onChange={(e) => setSelectedHDD(e.target.value)}>
                    <option value="">Жорсткий диск</option>
                    {hdds.map((hdd) => (
                        <option key={hdd.id_hdd} value={hdd.id_hdd}>{hdd.name_hdd}</option>
                    ))}
                </select>

                <select value={selectedSSD} onChange={(e) => setSelectedSSD(e.target.value)}>
                    <option value="">SSD</option>
                    {ssds.map((ssd) => (
                        <option key={ssd.id_ssd} value={ssd.id_ssd}>{ssd.name_ssd}</option>
                    ))}
                </select>

                <select value={selectedCooling} onChange={(e) => setSelectedCooling(e.target.value)}>
                    <option value="">Охолодження</option>
                    {coolings.map((cooling) => (
                        <option key={cooling.id_cooling} value={cooling.id_cooling}>{cooling.name_cooling}</option>
                    ))}
                </select>

                <select value={selectedPower} onChange={(e) => setSelectedPower(e.target.value)}>
                    <option value="">Блок живлення</option>
                    {powers.map((power) => (
                        <option key={power.id_power} value={power.id_power}>{power.name_power}</option>
                    ))}
                </select>

                <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                    <option value="">Корпус</option>
                    {units.map((unit) => (
                        <option key={unit.id_unit} value={unit.id_unit}>{unit.name_unit}</option>
                    ))}
                </select>

                <select value={selectedMonitor} onChange={(e) => setSelectedMonitor(e.target.value)}>
                    <option value="">Монітор</option>
                    {monitors.map((monitor) => (
                        <option key={monitor.id_monitor} value={monitor.id_monitor}>{monitor.name_monitor}</option>
                    ))}
                </select>

                <select value={selectedMouse} onChange={(e) => setSelectedMouse(e.target.value)}>
                    <option value="">Миша</option>
                    {mouses.map((mouse) => (
                        <option key={mouse.id_mouse} value={mouse.id_mouse}>{mouse.name_mouse}</option>
                    ))}
                </select>

                <select value={selectedKeyboard} onChange={(e) => setSelectedKeyboard(e.target.value)}>
                    <option value="">Клавіатура</option>
                    {keyboards.map((keyboard) => (
                        <option key={keyboard.id_keyboard} value={keyboard.id_keyboard}>{keyboard.name_keyboard}</option>
                    ))}
                </select>

                <select value={selectedHeadset} onChange={(e) => setSelectedHeadset(e.target.value)}>
                    <option value="">Навушники</option>
                    {headsets.map((headset) => (
                        <option key={headset.id_headset} value={headset.id_headset}>{headset.name_headset}</option>
                    ))}
                </select>
            </div>
            <div className='grid'>
                {pcs && pcs.map((pc) => (
                    <ItemPC
                        key={pc.id_pc}
                        pc={pc}
                        update={update}
                        setUpdate={setUpdate}
                        getCPUName={getCPUName}
                        getGPUName={getGPUName}
                        getMotherboardName={getMotherboardName}
                        getRAMName={getRAMName}
                        getHDDName={getHDDName}
                        getSSDName={getSSDName}
                        getCoolingName={getCoolingName}
                        getPowerName={getPowerName}
                        getUnitName={getUnitName}
                        getMonitorName={getMonitorName}
                        getMouseName={getMouseName}
                        getKeyboardName={getKeyboardName}
                        getHeadsetName={getHeadsetName}
                    />
                ))}
            </div>
        </div>
    );
}

export default GridPC;
