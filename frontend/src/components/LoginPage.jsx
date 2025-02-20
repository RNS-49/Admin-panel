import React from 'react'
import { useState } from 'react'
import "../styles/login.css"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'


function Login() {

  const [admin,setAdmin] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate();


  const handleLogin=async(e)=>{
    e.preventDefault()
    
     try {
      const response = await axios.post("https://admin-panel-shx8.onrender.com/api/auth/login",admin);
      console.log(response);

      if(response.status === 201){
        toast.success("Admin Login Successful")
        navigate("/")
      }

       // Store admin details in local storage
        const { email, password} = admin;
        localStorage.setItem('admin', JSON.stringify({ email, password}));
      
         window.dispatchEvent(new Event('authChange'));
         navigate('/'); // Redirect to the homepage
         
     } catch (error) {

      if(error.response.status === 400){
        toast.error("Invalid Email or Password")
      }else{
        toast.error("Network error")
      }
     }
  }


  return (
    <div className="login-container">
      <div className="login-form">
    <form onSubmit={handleLogin} >
      <h2>Welcome Back</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={admin.email}
        onChange={(e)=>setAdmin({...admin,email:e.target.value})}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={admin.password}
        onChange={(e)=>setAdmin({...admin,password:e.target.value})}
        minLength={6}
        required
      />
      <button type="submit" className='btn btn-dark'>Log in</button>
        

    </form>
    </div>
  </div>
  )
}

export default Login
