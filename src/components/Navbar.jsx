import React from "react";
import { FaUsers } from "react-icons/fa";
import {
  FaHome,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { GrDocumentTest } from "react-icons/gr";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
const handleLogout = () => {

  localStorage.clear();

  navigate("/login", {
    replace: true
  });
};
  return (
    <div className="fixed py-7 items-center mx-6 h-full">
      <nav className="bg-primary_hard rounded-3xl w-20 h-full flex flex-col items-center py-8">
        
        <ul className="flex flex-col space-y-8 text-white text-2xl">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-primary_gray p-2 rounded-lg" : ""}`
              }
            >
              <FaHome />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/test"
              className={({ isActive }) =>
                `${isActive ? "bg-primary_gray p-2 rounded-lg" : ""}`
              }
            >
              <FaFileMedical />
            </NavLink>
          </li>

  
          <li>
            <NavLink
              to="/doctor"
              className={({ isActive }) =>
                `${isActive ? "bg-primary_gray p-2 rounded-lg" : ""}`
              }
            >
              <FaUserDoctor />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `${isActive ? "bg-primary_gray p-2 rounded-lg" : ""}`
              }
            >
              <MdAddShoppingCart />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                `${isActive ? "bg-primary_gray p-2 rounded-lg" : ""}`
              }
            >
              <FaUsers />
            </NavLink>
          </li>

        </ul>

        <div className="mt-auto text-white text-2xl">
          <button
  onClick={handleLogout}
  className="hover:text-indigo-400"
>
  <FaSignOutAlt />
</button>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;