import React, { useEffect, useState } from 'react'
import './Doctor.css'
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '../../Images/avatar.png'
import { IoMenu } from 'react-icons/io5';
import { MdSpaceDashboard, MdFace } from 'react-icons/md';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { BsFillCalendarPlusFill, BsCalendarDay } from 'react-icons/bs';
import { FcManager } from 'react-icons/fc';


function Doctor() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='p-main'>
      <div className="sidebar" style={{ width: isOpen ? "70px" : "270px" }}>
        <div className="top-section">
          <h1 className="admin" style={{ display: isOpen ? "none" : "block" }}>Admin</h1>
          <div className="bars" style={{ marginLeft: isOpen ? "0px" : "70px" }}>
            <IoMenu onClick={toggle} />
          </div>
        </div>
        <div className="avatar" style={{ display: isOpen ? "none" : "flex" }}>
          <img src={Avatar}></img>
          <p>{data.fname} {data.lname}</p>
        </div>

        <div className="bottom-section">
          <li class="nav-item">
            <Link class="nav-link p-li" aria-current="page" to="/admin">
              <div className="icons">
                <MdSpaceDashboard className='p-icons' />
              </div>
              <p style={{ display: isOpen ? "none" : "block" }}>Dashboard</p></Link>
          </li>

          <li class="nav-item ">
            <Link class="nav-link p-li" to="/doctor">
              <div className="icons">
                <RiFirstAidKitFill className='p-icons' />
              </div>
              <p style={{ display: isOpen ? "none" : "block" }}>Doctor</p></Link>
          </li>

          <li class="nav-item ">
            <Link class="nav-link p-li" to="/patient">
              <div className="icons">
                <MdFace className='p-icons' />
              </div>
              <p style={{ display: isOpen ? "none" : "block" }}>Patient</p></Link>
          </li>

          <li class="nav-item">
            <Link class="nav-link p-li" to="/appointment" >
              <div className="icons">
                <BsFillCalendarPlusFill className='p-icons' />
              </div>
              <p style={{ display: isOpen ? "none" : "block" }}>Appointment</p></Link>
          </li>
        </div>
      </div>


      <div className="main-panel">
      <div className="mainContent" style={{width:isOpen ?"100%":"150%"}}>
          <h3>Dashboard</h3>
        </div>
        <div className="three-boxes">
        <div className="doctor-box">
            <div className="p-first">
              <FcManager className='d-img' style={{ color: "orange" }} />
              <Link to='/d-records'><h6 className='h6'>Doctor Records</h6></Link>
            </div>
          </div>
          <div className="doctor-box">
            <div className="p-first">
              <FcManager className='d-img' style={{ color: "orange" }} />
              <Link to='/add-doctor'><h6 className='h6'>Add Doctor</h6></Link>
            </div>
          </div>
          <div className="patient-box">
            <div className="p-second">
              <MdFace className='d-img' style={{ color: "blue" }} />
              <Link to='/update-doctor'><h6 className='h6'>Update Doctor Info</h6></Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Doctor