import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  // Check if the auth token exists in the cookies
  const token = Cookies.get('loginToken');

  return token ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;