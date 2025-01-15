// import React from 'react'
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthentication } from "../store/auth";

// const Admin = () => {

//   const { user, isLoading, isLoggedIn } = useAuthentication();


//   if (isLoading) {
//     return <h1 className="text-white">Loading...</h1>
//   }
// console.log("admin Page",isLoggedIn)
//   if (isLoggedIn) {
//     return user.isAdmin ? <Navigate to="/admin/admindashboard" /> : <Navigate to="/admin/empdashboard" />;
//   }
//   else {
//     return <Navigate to="/" />;
//   }

// }

// export default Admin
