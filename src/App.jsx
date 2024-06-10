import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

// Admin

// Director

// SystemAdmin

// Components

import Sidebar from './components/sidebar/jsx/Sidebar';
import Header from './components/header/jsx/Header';
import Workview from './components/workview/jsx/Workview';


function App() {

  const [role, setRole] = useState("sysadmin");
  const [tab, setTab] = useState(1);
  const [update, setUpdate] = useState(1);

  useEffect(() => {

  }, [update])

  const LayoutDashboard = () => {

    if (role === "director") {
      return (
        <>
          <Header role={role} />
          <div className='container'>
            <Sidebar role={role} tab={tab} setTab={setTab} />
            <Workview role={role} tab={tab} update={update} setUpdate={setUpdate} />
          </div>
        </>
      )
    } else if (role === "sysadmin") {
      return (
        <>
          <Header role={role} />
          <div className='container'>
            <Sidebar role={role} tab={tab} setTab={setTab} />
            <Workview role={role} tab={tab} update={update} setUpdate={setUpdate} />
          </div>
        </>
      )
    } else if (role === "admin") {
      return (
        <>
          <Header role={role} />
          <div className='container'>
            <Sidebar role={role} tab={tab} setTab={setTab} />
            <Workview role={role} tab={tab} update={update} setUpdate={setUpdate} />
          </div>
        </>
      )
    } else {
      return (
        <>У вас немає доступу</>
      )
    }
  }

  const LayoutLogin = () => {

  }

  const LayoutRegister = () => {

  }


  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LayoutDashboard />} />
          <Route path='/login' element={<LayoutLogin />} />
          <Route path='/register' element={<LayoutRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
