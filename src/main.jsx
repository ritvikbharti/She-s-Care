import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './Layouts/HomeLayout.jsx';
import Home from './pages/HomePage/Home.jsx';
import Product from './pages/ProductPage/Product.jsx';
import Doctor from './pages/DoctorPage/Doctor.jsx';
import Test from './pages/TestPage/Test.jsx';
import Order from './pages/OrderPage/Order.jsx';
import { ToastContainer } from 'react-toastify';
import UseLogin from './hooks/UseLogin.jsx'; // Correct case
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.jsx';

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating authentication status.

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      console.log("entered")
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <UseLogin isLoggedIn={isLoggedIn}>
          <HomeLayout />
        </UseLogin>
      ),
      children: [
        { path: '', element: <Home/> },
        { path: 'product', element: <Product /> },
        { path: 'doctor', element: <Doctor /> },
        { path: 'test', element: <Test /> },
        { path: 'order', element: <Order /> },
      ],
    },
    { path: '/login', element: <RegistrationPage onLogin = {handleLogin} /> },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
