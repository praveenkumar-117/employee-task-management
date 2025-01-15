import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Signup = () => {
  // const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await fetch('http://localhost:7000/api/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })
      const res_data = await response.json();
      console.log("server response is ", res_data)

      if (response.ok) {
        toast.success("Registrations Successfull")
        setUserData({
          name: "",
          password: "",
          email: "",
        })

      } else {
        toast.error(res_data.extraDetails ? res_data.extraDeatils : res_data.message)
      }
    }
    catch (error) {
      console.log("SignUp", error);
    }

  }


  return (
    <>
      {/* <div className='flex items-center justify-center min-h-screen'>
        <div className='d-bg p-8 rounded-lg shadow-lg w-80 max-w-xs h-2/3'>
          <h3 className='font-semibold text-3xl text-center text-emerald-400 mb-6 underline'>Sign Up</h3> */}

          <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label className='text-gray-300 font-medium'>Full Name</label>
              <input
                type="text"
                name='name'
                id='signup_name'
                value={userData.name}
                onChange={handleInput}
                required
                autoComplete='off'
                placeholder="Enter Your Full Name"
                className='mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-300 font-medium'>Your Email</label>
              <input
                type="text"
                name='email'
                id='signup_email'
                value={userData.email}
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
                id='signup_password'
                value={userData.password}
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
              Sign Up
            </button>
          </form>
      {/* //   </div>
      // </div> */}

    </>
  )
}

export default Signup;
