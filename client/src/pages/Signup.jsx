import React, { useState } from "react";

import { toast } from "react-toastify";
import { useAuthentication } from "../store/auth";

const Signup = () => {
  

  const { url } = useAuthentication();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${url}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const res_data = await response.json();

    if (response.ok) {
      toast.success("Registration Successful");

      setUserData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      toast.error(res_data.extraDetails || res_data.message);
    }
  } catch (error) {
    toast.error("Unable to connect with server");
  }
};
  return (
    <>
     

      <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            id="signup_name"
            value={userData.name}
            onChange={handleInput}
            required
            autoComplete="off"
            placeholder="Enter Your Full Name"
            className="mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            id="signup_email"
            value={userData.email}
            onChange={handleInput}
            required
            autoComplete="off"
            placeholder="Enter Your Email"
            className="mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="signup_password"
            value={userData.password}
            onChange={handleInput}
            placeholder="Enter Your Password"
            required
            autoComplete="off"
            className="mt-1 p-2 border border-gray-500 rounded-md  bg-transparent text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-emerald-500 text-white py-2 rounded-md font-semibold text-xl hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
        >
          Sign Up
        </button>
      </form>
     
    </>
  );
};

export default Signup;
