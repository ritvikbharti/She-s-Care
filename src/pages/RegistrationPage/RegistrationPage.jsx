// import React, { useState } from "react";
// import { useGoogleLogin } from '@react-oauth/google'; // Import Google login hook
// import google from "../../assets/logo/google.png";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const RegistrationPage = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     termsAccepted: false,
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.termsAccepted) {
//       alert("Please accept the terms and conditions!");
//       return;
//     }
//     onLogin();
//     toast.success("Login Successful!");
//     console.log("Form submitted:", formData);
//     navigate("/");
//   };

//   // Google Login Handler
//   const googleLogin = useGoogleLogin({
//     onSuccess: (response) => {
//       console.log("Google Login Success:", response);
//       // Use `response` to fetch user details or tokens from Google's API
//       toast.success("Google Login Successful!");
//       navigate("/");
//     },
//     onError: () => {
//       toast.error("Google Login Failed!");
//     },
//   });

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Left Section - Carousel */}
//       <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-gray-900 p-10">
//         <div className="text-4xl font-extrabold mb-3 text-white text-[59px] font-serif">
//           Fairy Mate
//         </div>
//         <p className="text-gray-600 text-[19px] ml-[5rem] font-serif">
//           Consult to our Doctors Seamlessly.
//         </p>
//       </div>

//       {/* Right Section - Registration Form */}
//       <div className="w-1/2 flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-800 p-10 rounded-lg shadow-md w-3/4 space-y-5"
//         >
//           <h2 className="text-3xl font-bold mb-2">Create an account</h2>
//           <p>
//             Already have an account?{" "}
//             <Link to={"/login"} className="text-indigo-400 underline">
//             Log in
//             </Link>
//           </p>

//           <div className="flex space-x-3">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
//               required
//             />
//           </div>
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
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="termsAccepted"
//               checked={formData.termsAccepted}
//               onChange={handleInputChange}
//               className="mr-2"
//               required
//             />
//             <label htmlFor="termsAccepted">
//               I agree to the{" "}
//               <a href="/terms" className="text-indigo-400 underline">
//                 Terms & Conditions
//               </a>
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="bg-indigo-600 w-full py-3 rounded-md text-white hover:bg-indigo-500"
//           >
//             Create account
//           </button>

//           <div className="text-center mt-5">Or register with</div>
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

// export default RegistrationPage;

import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../assets/logo/google.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; //  connect to backend
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  // handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle submit (call backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // extract user and token from response
      const { user, token } = res.data;

      // save user details & token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      onLogin();  // tell parent app that login succeeded
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // Google Login (optional)
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
          Consult to our Doctors Seamlessly.
        </p>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-10 rounded-lg shadow-md w-3/4 space-y-5"
        >
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-400 underline">
              Log in
            </Link>
          </p>

          {/* First & Last Name */}
          <div className="flex space-x-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>

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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <label htmlFor="termsAccepted">
              I agree to the{" "}
              <a href="/terms" className="text-indigo-400 underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-indigo-600 w-full py-3 rounded-md text-white hover:bg-indigo-500"
          >
            Create account
          </button>

          {/* Google Login */}
          <div className="text-center mt-5">Or register with</div>
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

export default RegistrationPage;
