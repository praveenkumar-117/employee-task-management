import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthentication } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { storeTokenLS, url, userAuthentication } = useAuthentication();
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const res_Data = await response.json();

      if (response.ok) {
        storeTokenLS(res_Data.token);
        userAuthentication();

        toast.success("Login Successfully");

        setLoginData({
          email: "",
          password: "",
        });

        const admin = res_Data.isAdmin;

        if (admin) {
          navigate("/admindashboard");
        } else {
          navigate("/empdashboard");
        }
      } else {
        toast.error(
          res_Data.extraDetails ? res_Data.extraDetails : res_Data.message,
        );
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Your Email</label>
          <input
            type="text"
            name="email"
            id="login_email"
            value={loginData.email}
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
            id="login_password"
            value={loginData.password}
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
          Login
        </button>
      </form>
    </>
    //    </div>
    //  </div>
  );
};

export default Login;
