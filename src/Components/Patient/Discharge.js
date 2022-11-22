import React, { useEffect, useState } from 'react'
import './Patient.css'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Avatar from '../../Images/avatar.png'
import { IoMenu } from 'react-icons/io5';
import { MdSpaceDashboard, MdFace } from 'react-icons/md';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { BsFillCalendarPlusFill, BsCalendarDay } from 'react-icons/bs';
import { FcManager } from 'react-icons/fc';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function Discharge(props) {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const get = async (e) => {
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

    useEffect(() => {
        get()
    }, [])

    const handleSearch = async (event) => {
        let key = event.target.value;
        if (key != '') {
            try {
                fetch(`http://localhost:5000/search/${key}`, {
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
                        }
                        else {
                            props.setDataP([])

                        }
                    })
            } catch (error) {

            }
        } else {
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

    }

    // const remove = () => {
    //     fetch("http://localhost:5000/remove-doctor/", {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*"
    //   },
    //   body: JSON.stringify({

    //   })
    // }).then((res) => res.json())
    //   .then((data) => {
    //     alert("Record Deleted")
    //   })
    // }

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
                <div className="mainContent" style={{ width: isOpen ? "100%" : "150%" }}>
                    <h3>Dashboard</h3>
                </div>
                <div className="input">
                    <input className='searchbar' type='text' placeholder='Patient Name' onChange={handleSearch}></input>
                </div>
                <div className="form1">
                    {

                        props.DataP.length > 0 ?
                            <Table className='table table-light table-hover m-0'>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Age</Th>
                                        <Th>Gender</Th>
                                        <Th>Phone No.</Th>
                                        <Th>StateCountry</Th>
                                        <Th>Symptoms</Th>
                                        <Th>Blood Group</Th>
                                        <Th>Discharge</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        props.DataP.map((i, key) => {
                                            return (
                                                <Tr>
                                                    <Td>{i.fname} {i.lname}</Td>
                                                    <Td>{i.email}</Td>
                                                    <Td>{i.age}</Td>
                                                    <Td>{i.gender}</Td>
                                                    <Td>{i.phone}</Td>
                                                    <Td>{i.stateCountry}</Td>
                                                    <Td>{i.symptoms}</Td>
                                                    <Td>{i.bloodGroup}</Td>
                                                    <Td><button onClick={()=>navigate("/billing",{state:{i}})}>Discharge</button></Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                            : <h4>No Patients Found</h4>

                    }

                </div>
            </div>
        </div>
    )
}

export default Discharge