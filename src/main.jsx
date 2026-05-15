import { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./app/store";

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
import Wallet from "./pages/WalletPage/Wallet.jsx";
import ReportHistory from "./pages/Report/ReportHistory.jsx";
import Team from "./pages/TeamPage/Team.jsx";
import { UserProvider } from "./context/userContext.jsx";
import api from "./utils/api.js"; 
import { useMemo } from "react";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//  FIX 1: Build the router OUTSIDE the component.
// Putting createBrowserRouter inside AppRouter means a brand-new router
// is created on every render (login, logout, loading toggle) which remounts
// the entire app and breaks all navigation state.
function buildRouter(isLoggedIn, handleLogin, handleLogout) {
  return createBrowserRouter([
    {
      // Protected: requires login
      path: "/",
      element: (
        <UseLogin isLoggedIn={isLoggedIn}>
          <HomeLayout onLogout={handleLogout} />  {/*  pass logout to layout/navbar */}
        </UseLogin>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "product",        element: <Product /> },
        { path: "doctor",         element: <Doctor /> },
        { path: "test",           element: <Test /> },          //  PCOS test
        { path: "report",         element: <Test /> },          // Dashboard's "+ Add New Test" links here
        { path: "report-history", element: <ReportHistory /> },
        { path: "order",          element: <Order /> },
        { path: "team",           element: <Team /> },
        { path: "wallet", element: <Wallet /> },
      ],
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate to="/" replace />   // already logged in → go home
      ) : (
        <AuthLayout>
          <LoginPage onLogin={handleLogin} />
        </AuthLayout>
      ),
    },
    {
      path: "/register",
      element: isLoggedIn ? (
        <Navigate to="/" replace />
      ) : (
        <AuthLayout>
          <RegistrationPage onLogin={handleLogin} />
        </AuthLayout>
      ),
    },
  ]);
}

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");

  setIsLoggedIn(false);

  window.location.href = "/login";
};
  const router = useMemo(() => {
    return buildRouter(isLoggedIn, handleLogin, handleLogout);
  }, [isLoggedIn]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        await api.get("/api/auth/me");
        setIsLoggedIn(true);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
        }
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);