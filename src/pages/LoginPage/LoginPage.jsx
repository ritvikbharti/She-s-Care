// import React, { useState } from "react";
// import { useGoogleLogin } from '@react-oauth/google'; // Import Google login hook
// import google from "../../assets/logo/google.png";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LoginPage = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock login validation (replace with your API integration)
//     if (!formData.email || !formData.password) {
//       toast.error("Please fill in all fields.");
//       return;
//     }
//     onLogin(); // Notify parent component on successful login
//     toast.success("Login Successful!");
//     console.log("Login data:", formData);
//     navigate("/"); // Redirect to home page
//   };

//   // Google Login Handler
//   const googleLogin = useGoogleLogin({
//     onSuccess: (response) => {
//       console.log("Google Login Success:", response);
//       toast.success("Google Login Successful!");
//       navigate("/");
//     },
//     onError: () => {
//       toast.error("Google Login Failed!");
//     },
//   });

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Left Section */}
//       <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-gray-900 p-10">
//         <div className="text-4xl font-extrabold mb-3 text-white text-[59px] font-serif">
//           Fairy Mate
//         </div>
//         <p className="text-gray-600 text-[19px] ml-[5rem] font-serif">
//           Consult to our Doctors Seamlessly.
//         </p>
//       </div>

//       {/* Right Section - Login Form */}
//       <div className="w-1/2 flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-800 p-10 rounded-lg shadow-md w-3/4 space-y-5"
//         >
//           <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
//           <p>
//             Don’t have an account?{" "}
//            <Link to={"/register"} className="text-indigo-400 underline">
//            Sign up
//            </Link>
//           </p>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
//             required
//           />
//           <div className="relative">
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-indigo-600 w-full py-3 rounded-md text-white hover:bg-indigo-500"
//           >
//             Log In
//           </button>

//           <div className="text-center mt-5">Or log in with</div>
//           <div className="flex justify-center space-x-5 mt-3">
//             <button
//               className="bg-gray-700 p-3 rounded-md flex items-center space-x-2"
//               onClick={googleLogin}
//               type="button"
//             >
//               <img src={google} alt="Google" className="h-5 w-5" />
//               <span>Google</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../assets/logo/google.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; //  use axios for backend API calls
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Call backend login endpoint
      const res = await axios.post(`https://she-care-backend-63p6.onrender.com/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = res.data;

      // Save user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      // Notify app state (if needed)
      onLogin();

      toast.success("User Login successful!");
      navigate("/"); // redirect to dashboard / home
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  // Google Login Handler
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Login Success:", response);
      toast.success("Google Login Successful!");
      navigate("/");
    },
    onError: () => {
      toast.error("Google Login Failed!");
    },
  });

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-gray-900 p-10">
        <div className="text-4xl font-extrabold mb-3 text-white text-[59px] font-serif">
          SheCare
        </div>
        <p className="text-gray-400 text-[19px] ml-[5 rem] font-serif">
          Seamless Support for Your PCOD/PCOS Journey.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-10 rounded-lg shadow-md w-3/4 space-y-5"
        >
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p>
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-indigo-400 underline">
              Sign up
            </Link>
          </p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your valid password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 w-full py-3 rounded-md text-white hover:bg-indigo-500"
          >
            Log In
          </button>

          {/* Google Login */}
          <div className="text-center mt-5">Or log in with</div>
          <div className="flex justify-center space-x-5 mt-3">
            <button
              className="bg-gray-700 p-3 rounded-md flex items-center space-x-2"
              onClick={googleLogin}
              type="button"
            >
              <img src={google} alt="Google" className="h-5 w-5" />
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
