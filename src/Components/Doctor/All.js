import React, { useEffect, useState } from 'react'
import './Doctor.css'
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '../../Images/avatar.png'
import { IoMenu } from 'react-icons/io5';
import { MdSpaceDashboard, MdFace } from 'react-icons/md';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { BsFillCalendarPlusFill, BsCalendarDay } from 'react-icons/bs';
import { FcManager } from 'react-icons/fc';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function All(props) {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const toggle = () => {
        setIsOpen(!isOpen)
    }

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

    useEffect(()=>{
        get()
    },[])

    const remove = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/remove-doctor/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email
      })
    }).then((res) => res.json())
      .then((data) => {
        alert("Record Deleted")
        window.location.reload(false)
      })
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
                <div className="form1">
                <Table className='table table-light table-hover m-0'>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone No.</Th>
                        <Th>Specialization</Th>
                        <Th>Remove</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.Data.map((i,key)=>{
                                return(
                                    <Tr>
                                        <Td>{i.fname} {i.lname}</Td>
                                        <Td>{i.email}</Td>
                                        <Td>{i.phone}</Td>
                                        <Td>{i.specialization}</Td>
                                        <Td><form onSubmit={remove}><button type='submit' onClick={()=>setEmail(i.email)}>Remove</button></form></Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                  </Table>
                
                </div>
            </div>
        </div>
  )
}

export default All