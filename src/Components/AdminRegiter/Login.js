import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './AdminRegister.css'

function Login(props) {
    const navigate = useNavigate();

    const [user ,setUser] = useState({
        email:"", password:"" 
    });
    let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

    const checkLogin = (e) => {
        const email=user.email
        const password=user.password
        e.preventDefault();
        try {
            fetch("http://localhost:5000/login-user/",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                email,password
            })
        })
        .then((res)=>res.json())
        .then((data) => {
            props.checkStatus(data.data);
            console.log(data, "userLoggedIn");
            if(data.status === "ok"){
                alert("login successful");
                window.localStorage.setItem("token",data.data);
                navigate('/admin')
            }
            else if(data.status === "error"){
                alert("User Not Exists")
            }
            console.log(props.status);
    })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="l-main">
                <div className="l-wrapper">
                    <div className="l-header">
                        <h2 className=''>Admin Login</h2>
                    </div>
                    <br></br>
                    <form onSubmit={checkLogin}>
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
                        <p>New here? <Link to='/signup' style={{textDecoration:"none"}}>Register</Link></p>
                        <button type="submit" class="r-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login