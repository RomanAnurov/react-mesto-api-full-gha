import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(props) {
  const {isLoggedIn} = props;
  if(!isLoggedIn) {
    return <Navigate to='sign-in' replace />
  }
  return <Outlet />
}

export default ProtectedRoute;