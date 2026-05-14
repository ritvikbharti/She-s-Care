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
import api from "./utils/api.js"; // ✅ shared axios instance — no more hardcoded URLs

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// ✅ FIX 1: Build the router OUTSIDE the component.
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
          <HomeLayout onLogout={handleLogout} />  {/* ✅ pass logout to layout/navbar */}
        </UseLogin>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "product",        element: <Product /> },
        { path: "doctor",         element: <Doctor /> },
        { path: "test",           element: <Test /> },          // ✅ PCOS test
        { path: "report",         element: <Test /> },          // ✅ Dashboard's "+ Add New Test" links here
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
  const [loading, setLoading]       = useState(true);

  // ✅ FIX 2: Keep the router in a ref so it is only replaced when auth state
  // actually changes — not on every render.
  const routerRef = useRef(null);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // Rebuild router only when isLoggedIn changes (not on every render)
  if (!routerRef.current || routerRef.current.authState !== isLoggedIn) {
    routerRef.current = buildRouter(isLoggedIn, handleLogin, handleLogout);
    routerRef.current.authState = isLoggedIn; // track which state this router was built for
  }

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        // ✅ FIX 3: Use api instance — was hardcoded to localhost:5000
        const res = await api.get("/api/auth/me");

        if (res.data) {
          setIsLoggedIn(true);
        } else {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err.message);
        localStorage.clear();
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <RouterProvider router={routerRef.current} />
    </>
  );
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