import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../store/auth';


// Create a ProtectedRoute component to protect specific routes
const ProtectedRoute = ({childern}) => {
  const { user, isLoggedIn, isLoading} = useAuthentication();
  
  console.log("protected-isLogged In", isLoggedIn);
  console.log("protected-page", user);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoggedIn) {
    return <Outlet />;
  } else {

    return <Navigate to='/' replace />;
  }
  // if(user.isAdmin){
  //   return <Navigate to='/admindashboard' replace />;
  // }else{
  //   return <Navigate to='/empdashboard' replace />;
  // }


}
export default ProtectedRoute;
