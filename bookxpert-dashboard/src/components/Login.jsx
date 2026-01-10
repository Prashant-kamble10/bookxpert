import {useState} from "react";
import React from "react";
import { VALID_CREDENTIALS } from "../constants/credentials";


const Login = ({ onLoginSuccess }) => {

   const  loginObj = {
    email : "",
    password : ""
  }

  const [login, setLogin ] = useState(loginObj)
  const [error, setError] = useState("")

 
  function handleChange(event){
    const {name, value} = event.target
     setLogin((prev)=>({
       ...prev,
      [name] : value
     }))
    setError("")
  }

  function handleLogin(event){
    event.preventDefault()
    
    // Validate credentials
    const isValidUser = VALID_CREDENTIALS.some(
      cred => cred.email === login.email && cred.password === login.password
    )

    if(isValidUser){
      setLogin(loginObj)
      setError("")
      onLoginSuccess()
    } else {
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" name="email" value={login.email} onChange={handleChange}/>

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" name="password" value={login.password} onChange={handleChange}/>

        {error && <div className="alert alert-error mt-4"><span>{error}</span></div>}

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@bookxpert.com</p>
          <p>Password: admin@123</p>
        </div>
      </fieldset>
    </div>
  
  );
};

export default Login;
