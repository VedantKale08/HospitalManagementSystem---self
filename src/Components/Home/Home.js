import React from 'react'
import doctor from '../../Images/doctor.jpg'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-main">
        <div className="h-image-text">
          <img src={doctor} className='h-main-img'></img>
          <div className="h-head-text">
            <h3 className='h-h3'>YOUR HEALTHY LIFE IS OUR <p style={{ color: "#00ADB5" }}>FIRST PRIORITY</p></h3>
          </div>
          <div className="h-buttonDiv">
            <button className='h-button' onClick={()=>navigate("/admin")}>Admin</button>
            <button className='h-button1'>Contact Us</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home