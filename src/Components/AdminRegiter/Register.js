import React, { useState } from 'react'
import './AdminRegister.css'
import { useNavigate,Link } from 'react-router-dom'


function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fname: "", lname: "", email: "", password: ""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const post = async (e) => {

        const fname = user.fname
        const lname = user.lname
        const email = user.email
        const password = user.password
        e.preventDefault();
        try {
            fetch("http://localhost:5000/register/", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    fname, lname, email, password
                })
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data, "userRegistered");
                    if (data.status === "ok") {
                        alert("Registration successful");
                        navigate('/login')
                    }
                    else if (data.status === "error") {
                        alert("Something went Wrong")
                    }
                })
        } catch (error) {
            alert("Something went Wrong")
        }

    }
    return (
        <>
            <div className="r-main">
                <div className="r-wrapper">
                    <div className="r-header">
                        <h2 className=''>Register New Admin</h2>
                    </div>
                    <br></br>
                    <form onSubmit={post}>
                        <div class="mb-3">
                            <label for="exampleInputFName1" class="form-label">First Name</label>
                            <input type="text" name='fname' class="form-control" id="exampleInputFName1"
                                value={user.fname}
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
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" name='password' class="form-control" id="exampleInputPassword1"
                                value={user.password}
                                onChange={handleInputs}
                            />
                        </div>
                        <p>Already Registered? <Link to='/login' style={{textDecoration:"none"}}>Login</Link></p>
                        <button type="submit" class="r-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register