import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Link,useNavigate } from 'react-router-dom'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import Doctor from '../Doctor/Doctor'
import './Navbar.css'
import Register from '../AdminRegiter/Register'
import Login from '../AdminRegiter/Login'
import Add from '../Doctor/Add'
import Remove from '../Doctor/Remove'
import Update from '../Doctor/Update'
import All from '../Doctor/All'
import UpdateOne from '../Doctor/UpdateOne'
import Patient from '../Patient/Patient'
import AllP from '../Patient/AllP'
import AddP from '../Patient/AddP'
import Discharge from '../Patient/Discharge'
import Billing from '../Patient/Billing'

function NavBarr() {
    const [status,checkStatus] = useState("");
    const [Data,setData] = useState([]);
    const [DataP,setDataP] = useState([]);


    const navigate = useNavigate();
    const logout= ()=> {
        localStorage.removeItem("token");
        navigate('/login')
        window.location.reload(false)
      }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid">
                    <a class="navbar-brand n-a" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin">Admin</Link>
                            </li>
                            {/* <li class="nav-item">
                                <Link class="nav-link" to="/doctor">Doctor</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Patients</a>
                            </li> */}
                        </ul>
                        {
                        status === "" || status=== undefined?
                        <div> </div>
                        :
                        <div className='ms-auto'>
                        <button className='n-button' onClick={logout}>LogOut</button>
                        </div>
                    }
                    </div>
                    
                    
                </div>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin status={status} checkStatus={checkStatus} Data={Data} setData={setData} DataP={DataP} setDataP={setDataP}/>} />
                    <Route path='/login' element={<Login status={status} checkStatus={checkStatus}/>}/>
                    <Route path='/signup' element={<Register/>}/>

                    <Route path='/doctor' element={<Doctor/>}/>
                    <Route path='/d-records' element={<All Data={Data} setData={setData}/>}/>
                    <Route path='/add-doctor' element={<Add Data={Data} setData={setData}/>}/>
                    <Route path='/remove-doctor' element={<Update/>}/>
                    <Route path='/Update' element={<UpdateOne/>}/>
                    <Route path='/update-doctor' element={<Update Data={Data} setData={setData}/>}/>

                    <Route path='/patient' element={<Patient/>}/>
                    <Route path='/p-records' element={<AllP DataP={DataP} setDataP={setDataP}/>}/>
                    <Route path='/add-patient' element={<AddP DataP={DataP} setDataP={setDataP}/>}/>
                    <Route path='/discharge' element={<Discharge DataP={DataP} setDataP={setDataP}/>}/>
                    <Route path='/billing' element={<Billing DataP={DataP} setDataP={setDataP}/>}/>
                </Routes>
            </div>
        </>
    )
}

export default NavBarr

