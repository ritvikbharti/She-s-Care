import React from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedicalAlt,
  FaFileMedical,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GrDocumentTest } from "react-icons/gr";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className=" fixed bg-primary_hard rounded-3xl w-20  h-[40rem] ms-6 mt-7 flex flex-col items-center py-8">
      <ul className="flex flex-col space-y-8 text-white text-2xl">
        <li>
          <NavLink 
          to="/"
          className={({isActive})=>
            `${isActive ? "bg-primary_gray": ""}`}
          >
            <FaHome />
          </NavLink>
        </li>

        <li>
          <NavLink
          to="/test"
          className={({isActive})=>{
            `${isActive ? "bg-primary_gray": ""}`
          }}
          >
            <FaFileMedical />
          </NavLink>
        </li>

        <li>
          <NavLink
          to="/doctor">
            <FaUserDoctor />
          </NavLink>
        </li>

        <li>
          <NavLink
          to="/product"
          >
            <MdAddShoppingCart />
          </NavLink>
        </li>

        {/* <li>
          <NavLink>
          <FaUser />
          </NavLink>
        </li> */}
      </ul>
      <div className="mt-auto text-white text-2xl">
        <button className="hover:text-indigo-400">
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
