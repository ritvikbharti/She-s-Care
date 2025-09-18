import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import Home from "./pages/HomePage/Home.jsx";
import Product from "./pages/ProductPage/Product.jsx";
import Doctor from "./pages/DoctorPage/Doctor.jsx";
import Test from "./pages/TestPage/Test.jsx";
import Order from "./pages/OrderPage/Order.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import UseLogin from "./hooks/UseLogin.jsx";
import { ToastContainer } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./app/store";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UseLogin isLoggedIn={isLoggedIn}>
          <HomeLayout />
        </UseLogin>
      ),
      children: [
        { path: "", element: <Home /> },
        { path: "product", element: <Product /> },
        { path: "doctor", element: <Doctor /> },
        { path: "test", element: <Test /> },
        { path: "order", element: <Order /> },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthLayout>
          <LoginPage onLogin={handleLogin} />
        </AuthLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthLayout>
          <RegistrationPage onLogin={handleLogin} />
        </AuthLayout>
      ),
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);