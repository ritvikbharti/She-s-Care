import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import HomeLayout from './Layouts/HomeLayout.jsx';
import Home from './pages/HomePage/Home.jsx';
import Product from './pages/ProductPage/Product.jsx';
import Doctor from './pages/DoctorPage/Doctor.jsx';
import Test from './pages/TestPage/Test.jsx';
import Order from './pages/OrderPage/Order.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'product', element: <Product /> },
      { path: 'doctor', element: <Doctor /> },
      { path: 'test', element: <Test /> },
      {path: 'order', element: <Order/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
