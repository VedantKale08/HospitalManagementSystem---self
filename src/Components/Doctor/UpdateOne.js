import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '../../Images/avatar.png'
import { IoMenu } from 'react-icons/io5';
import { MdSpaceDashboard, MdFace } from 'react-icons/md';
import { RiFirstAidKitFill } from 'react-icons/ri';
import { BsFillCalendarPlusFill, BsCalendarDay } from 'react-icons/bs';
import { FcManager } from 'react-icons/fc';

function UpdateOne() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [user,setUser] = useState({
        fname: location.state.i.fname, lname: location.state.i.lname, email: location.state.i.email,phone:location.state.i.phone,stateCountry:location.state.i.stateCountry,specialization:location.state.i.specialization
    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const postMe = async (e) => {

        const lname = user.lname
        const email = user.email
        const phone = user.phone
        const stateCountry = user.stateCountry
        e.preventDefault();
        try {
            fetch("http://localhost:5000/update-doctor/", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    lname, email, phone, stateCountry
                })
            }).then((res) => res.json())
                .then((data) => {
                    if (data.status === "ok") {
                        alert("Data Updated");
                        navigate('/update-doctor')
                    }
                    else if (data.status === "error") {
                        console.log(data.status);
                        alert("Something went Wrong")
                    }
                })
        } catch (error) {
            console.log(error);
            alert("Something went Wrong")
        }

    }

  return (
    <>
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
                <div className="form_outer">

                <div className="form">

                <form  onClick={postMe}>
                    <div class="mb-3">
                        <label for="exampleInputFName1" class="form-label">First Name</label>
                        <input type="text" name='fname' class="form-control" id="exampleInputFName1"
                        value={user.fname}
                        readOnly
                        style={{backgroundColor:"#EEEEEE"}}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputLName1" class="form-label">Last Name</label>
                        <input type="text" name='lname' class="form-control" id="exampleInputLName1"
                        value={user.lname}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={user.email}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPhone" class="form-label">Phone No.</label>
                        <input type="text" name='phone' class="form-control" id="exampleInputPhone"
                        value={user.phone}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputState" class="form-label">State Country</label>
                        <input type="text" name='stateCountry' class="form-control" id="exampleInputState"
                        value={user.stateCountry}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputSpec" class="form-label">Specialization</label>
                        <input type="text" name='specialization' class="form-control" id="exampleInputSpec"
                        value={user.specialization}
                        onChange={handleInputs}
                        readOnly
                        style={{backgroundColor:"#eee"}}
                        />
                    </div>
                    <button type="submit" class="r-button">Update</button>
                </form>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UpdateOne
