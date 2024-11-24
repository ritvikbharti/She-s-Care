import { Navigate } from 'react-router-dom';

export default function UseLogin({ isLoggedIn, children }) {
    console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
