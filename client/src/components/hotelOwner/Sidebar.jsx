import React from "react";
import { NavLink } from "react-router-dom";

import { assets } from "../../assets/assets";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "List Room",
      path: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];

  return (
    <nav className="w-16 md:w-72 border-r border-gray-300 h-full pt-4 flex flex-col transition-all duration-300">
      {sidebarLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/owner"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 md:px-8 transition-all ${
              isActive
                ? "bg-blue-600/10 border-r-4 md:border-r-[6px] border-blue-600 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`
          }
        >
          <img
            src={item.icon}
            alt={item.name}
            className="min-w-6 min-h-6"
          />

          <span className="hidden md:block">
            {item.name}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;