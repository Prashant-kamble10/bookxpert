import {useState} from "react";
import React from "react";


const Login = () => {

   const  loginObj = {
    email : "",
    password : ""
  }

  const [login, setLogin ] = useState(loginObj)

 
  function handleChange(event){
    const {name, value} = event.target
     setLogin((prev)=>({
       ...prev,
      [name] : value
     }))
  }


  return (
    <div className="flex justify-center items-center min-h-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" name="email" value={login.email} onChange={handleChange}/>

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" name="password" value={login.password} onChange={handleChange}/>

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  
  );
};

export default Login;
