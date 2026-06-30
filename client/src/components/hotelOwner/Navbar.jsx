import React from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/react";

import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-b border-gray-300 shadow-sm">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Roomora Logo"
          className="h-9 invert opacity-80"
        />
      </Link>

      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
        }}
      />
    </header>
  );
};

export default Navbar;