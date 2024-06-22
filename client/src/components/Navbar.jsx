import React, { useState } from "react";
import logo from "../assets/primepicks.png";
import { ShoppingCart, Search, Store, Home } from "lucide-react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-black text-white flex items-center justify-around  fixed w-full z-10 ">
      <div className="logo">
        <img src={logo} alt="" className="h-20" />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Products"
          className="text-start p-2 pl-5 rounded-xl w-[500px] text-black border-2 border-gray-300 focus:outline-none focus:none  transition-colors duration-300 lg:p-2"
          onChange={handleSearchChange}
        />
        <Search
          className="relative left-[-30px] cursor-pointer"
          color="black"
        />
      </div>
      <div className="">
        <ul className="flex gap-4 ">
          <li className="duration-300 hover:scale-125">
            <Link to={"/"} className="flex items-center">
              <Home className="mr-1" />
              Home
            </Link>
          </li>
          <li className="duration-300 hover:scale-125">
            <Link className="flex items-center " to={'/store'}>
              <Store className="mr-1" />
              Store
            </Link>
          </li>
          <li className="duration-300 hover:scale-125">
            <Link className="flex items-center" to={'/cart'}>
              {" "}
              <ShoppingCart className="mr-1" />
              Cart
            </Link>
          </li>
          <li className="flex items-center">
            <DropDown />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
