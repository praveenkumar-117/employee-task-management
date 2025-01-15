import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useAuthentication } from '../store/auth';
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const { storeTokenLS, user, userAuthentication } = useAuthentication();
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before Submit data", loginData);

    try {
      const response = await fetch('http://localhost:7000/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        
      })
      const res_Data = await response.json()
      console.log("frontEnd-Login Successfully", res_Data)

      if (response.ok) {
        storeTokenLS(res_Data.token);
        userAuthentication();
        toast.success("Login Successfully")
        setLoginData({
          email: "",
          password: "",
        })

        

        const admin = (res_Data.isAdmin) 
        console.log("1st", admin)
        // Perform isAdmin check after successful login
        if (admin) {
          console.log("if-true", admin)
          // Redirect to admin dashboard if user is admin
          navigate('/admindashboard');
        } else {
          console.log("if-false", admin)
          // Redirect to employee dashboard if user is not admin
          navigate('/empdashboard');
        }
         

      }
      else {
        toast.error(res_Data.extraDetails ? res_Data.extraDeatils : res_Data.message)
      }

    } catch (error) {
      console.log(error)
    }




  }

  return (
    // <div className='flex items-center justify-center min-h-screen'>
    //   <div className='d-bg p-8 rounded-lg shadow-lg w-80 max-w-xs h-96'>
    //     <h3 className='font-semibold text-3xl text-center text-emerald-400 mb-6 underline'>Login</h3>

    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='text-gray-300 font-medium'>Your Email</label>
          <input
            type="text"
            name='email'
            id='login_email'
            value={loginData.email}
            onChange={handleInput}
            required
            autoComplete='off'
            placeholder="Enter Your Email"
            className='mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white'
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-gray-300 font-medium'>Password</label>
          <input
            type="password"
            name='password'
            id='login_password'
            value={loginData.password}
            onChange={handleInput}
            placeholder="Enter Your Password"
            required
            autoComplete='off'
            className='mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white'
          />
        </div>

        <button
          type='submit'
          className='mt-4 bg-emerald-500 text-white py-2 rounded-md font-semibold text-xl hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600'
        >
          Login
        </button>
      </form>
    </>
    //    </div> 
    //  </div> 
  );
}

export default Login;
