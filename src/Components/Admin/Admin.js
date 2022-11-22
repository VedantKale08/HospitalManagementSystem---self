import React, { useEffect, useState } from 'react'
import './Admin.css'
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '../../Images/avatar.png'
import icons8Doctor from '../../Images/icons8-doctor-60.png'
import { IoMenu } from 'react-icons/io5';
import { MdSpaceDashboard, MdFace } from 'react-icons/md';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { BsFillCalendarPlusFill, BsCalendarDay } from 'react-icons/bs';
import { FcManager } from 'react-icons/fc';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function Admin(props) {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen)
  }


  const displayData = () => {
    fetch("http://localhost:5000/profile/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
  }
  useEffect(() => {
    displayData()
  }, [])

  const get = async (e) => {
    // e.preventDefault();
    try {
        fetch("http://localhost:5000/doctor-records/",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.status === "ok"){
                console.log(data.data);
                props.setData(data.data)
            }else{
                alert("something went wrong")
            }
        })
    } catch (error) {
        alert("something went wrong")
    }
}
const getP = async (e) => {
  // e.preventDefault();
  try {
      fetch("http://localhost:5000/patient-records/", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          }
      })
          .then((res) => res.json())
          .then((data) => {
              if (data.status === "ok") {
                  // console.log(data.data);
                  props.setDataP(data.data)
              } else {
                  alert("something went wrong")
              }
          })
  } catch (error) {
      alert("something went wrong")
  }
}

useEffect(()=>{
    get()
    getP()
},[])

  return (
    <>
      {
        props.status === "" || props.status === undefined ?
          <div className="a-main">
            <div className="a-wrapper">
              <h1 className='a-h1'>Hello Admin</h1>
              <p>Welcome to Hospital Management System</p>

              <div className="a-buttonDiv">
                <button className='a-button' onClick={() => navigate("/signup")}>Sign Up</button>
                <button className='a-button1' onClick={() => navigate("/login")}>Login</button>
              </div>
            </div>
          </div>


          :


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
              <div className="mainContent" style={{width:isOpen  ? "100%" : "150%" }}>
                <h3>Dashboard</h3>
              </div>
              <div className="three-boxes">
                <div className="doctor-box">
                  <div className="p-first">
                    <FcManager className='d-img' style={{ color: "orange" }} />
                    <h3>{props.Data.length}</h3>
                    <h6>Doctor</h6>
                  </div>
                </div>
                <div className="patient-box">
                  <div className="p-second">
                    <MdFace className='d-img' style={{ color: "blue" }} />
                    <h3>{props.DataP.length}</h3>
                    <h6>Patient</h6>
                  </div>
                </div>
                <div className="appointment-box">
                  <div className="p-third">
                    <BsCalendarDay className='d-img' style={{ color: "green" }} />
                    <h3>10</h3>
                    <h6>Appointment</h6>
                  </div>
                </div>
              </div>


              <div className="recent">
                <div className="recentDoctor">
                  <div className="r-doctor">
                    <h4 style={{display:"block",backgroundColor:"#0499a0",textAlign:"center",borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem",padding:"0.5rem"}}>Recent Doctors</h4>
                  <Table className='table table-light table-hover m-0'>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Department</Th>
                        <Th>Mobile</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                    {
                            props.Data.map((i)=>{
                                return(
                                    <Tr>
                                        <Td>{i.fname} {i.lname}</Td>
                                        <Td>{i.specialization}</Td>
                                        <Td>{i.phone}</Td>
                                        <Td>Hold</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                  </Table>
                  </div>
                </div>
                <div className="recentPatients">
                  <div className="r-patients">
                  <h4 style={{display:"block",backgroundColor:"#0499a0",textAlign:"center",borderTopLeftRadius:"1rem",borderTopRightRadius:"1rem",padding:"0.5rem"}}>Recent Patients</h4>
                <Table className='table table-light table-hover m-0'>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Symptoms</Th>
                        <Th>Gender</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        props.DataP.map((i)=>{
                          return(
                              <Tr>
                                  <Td>{i.fname} {i.lname}</Td>
                                  <Td>{i.symptoms}</Td>
                                  <Td>{i.gender}</Td>
                              </Tr>
                          )
                      })
                      }
                    </Tbody>
                  </Table>
                  <br></br>
                  <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Admin