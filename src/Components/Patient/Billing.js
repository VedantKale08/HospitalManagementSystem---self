import { useLocation } from 'react-router-dom';
import './Billing.css'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';


function Billing() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isShown, setIsShown] = useState(false);

    const [price, setPrice] = useState({
        room: 0, doctor: 0, medicine: 0, other: 0
    })
    let name, value
    const handleFees = (e) => {
        name = e.target.name;
        value = e.target.value;
        setPrice({ ...price, [name]: value })
    }

    const remove = (e) => {
        let email = location.state.i.email
        fetch("http://localhost:5000/remove-patient/", {
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
        // alert("Record Deleted")
        navigate("/discharge")
        window.location.reload(false)
      })
    }

    const Component = useRef();
    const Print = useReactToPrint({
            content : () => Component.current,
        });
    

    useEffect(()=>{
        // remove()
    },[])

    return (
        <>

            <div className="b-main" ref={Component}>
                
                        <div className="b-border" >
                            <div className='b-head'>
                                <div className="b-Hname">
                                    <h1>Hospital Management System</h1>
                                </div>
                                <div className="b-dates">
                                    <h6>Admit Date : {location.state.i.AdmitDate}</h6>
                                    <h6>Discharge Date : {new Date().toLocaleDateString()}</h6>
                                    <h6>Day Spent : {new Date().getDate() - parseInt(location.state.i.OnlyDate)}</h6>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="b-header2">
                                <div className="b-p-name">
                                    <h6>Patient Name : {location.state.i.fname} {location.state.i.lname}</h6>
                                    <h6>Patient Mobile : {location.state.i.phone}</h6>
                                    <h6>Patient Address : {location.state.i.stateCountry}</h6>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="b-symptoms">
                                <h5>Disease and Symptoms</h5>
                            </div>
                            <h6>{location.state.i.symptoms}</h6>
                            {/* <br/> */}
                            <br />
                            <div className="b-items">
                                <div className="b-item">
                                    <h5>Item</h5>
                                </div>
                                <div className="b-price">
                                    <h5>Price</h5>
                                </div>
                            </div>

                            <div className="b-oneItems">
                                <div className="b-oneitem">
                                    <h6>Room Charge</h6>
                                </div>
                                <div className="b-onePrice">
                                    <input type='number' placeholder='In Rupees' name='room' onChange={handleFees} />
                                </div>
                            </div>
                            <div className="b-oneItems">
                                <div className="b-oneitem">
                                    <h6>Doctor Fee</h6>
                                </div>
                                <div className="b-onePrice">
                                    <input type='number' placeholder='In Rupees' name='doctor' onChange={handleFees} />
                                </div>
                            </div>
                            <div className="b-oneItems">
                                <div className="b-oneitem">
                                    <h6>Medicine Cost</h6>
                                </div>
                                <div className="b-onePrice">
                                    <input type='number' placeholder='In Rupees' name='medicine' onChange={handleFees} />
                                </div>
                            </div>
                            <div className="b-oneItems">
                                <div className="b-oneitem">
                                    <h6>Other Charge</h6>
                                </div>
                                <div className="b-onePrice">
                                    <input type='number' placeholder='In Rupees' name='other' onChange={handleFees} />
                                </div>
                            </div>
                        </div>
                        
            </div>
                <div className="button">
                    <button onClick={Print}>Generate Bill</button> 
                </div>
            <br />
            <br />
        </>
    )
}

export default Billing