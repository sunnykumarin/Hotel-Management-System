import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserButton, useClerk } from "@clerk/react";

import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
];

const BookIcon = () => (
    <svg
        className="w-4 h-4 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            strokeWidth="2"
            d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
        />
    </svg>
);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
    const { openSignIn } = useClerk();

    const {
        user,
        navigate,
        isOwner,
        setShowHotelReg,
    } = useAppContext();

    const handleHotelClick = () => {
        if (isOwner) {
            navigate("/owner");
        } else {
            setShowHotelReg(true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(
                window.scrollY > 10 || location.pathname !== "/"
            );
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-lg shadow-md py-3 md:py-4 text-gray-700"
                    : "py-4 md:py-6"
                }`}
        >
            {/* Logo */}
            <Link to="/">
                <img
                    src={assets.logo}
                    alt="Roomora Logo"
                    className={`h-9 ${isScrolled ? "invert opacity-80" : ""
                        }`}
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-5 lg:gap-8">
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"
                            }`}
                    >
                        {link.name}

                        <span
                            className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled ? "bg-gray-700" : "bg-white"
                                }`}
                        />
                    </Link>
                ))}

                {user && (
                    <button
                        onClick={handleHotelClick}
                        className={`border px-4 py-1 rounded-full text-sm cursor-pointer transition-all ${isScrolled
                                ? "text-black border-black"
                                : "text-white border-white"
                            }`}
                    >
                        {isOwner ? "Dashboard" : "List Your Hotel"}
                    </button>
                )}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
                <button
                    className="cursor-pointer"
                    aria-label="Search"
                >
                    <img
                        src={assets.searchIcon}
                        alt="Search"
                        className={`h-6 ${isScrolled ? "invert" : ""
                            }`}
                    />
                </button>

                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() =>
                                    navigate("/my-bookings")
                                }
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className={`ml-4 px-8 py-2.5 rounded-full transition-all ${isScrolled
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Header */}
            <div className="flex items-center gap-3 md:hidden">
                {user && <UserButton />}

                <button
                    onClick={() =>
                        setIsMenuOpen(!isMenuOpen)
                    }
                    aria-label="Open Menu"
                >
                    <img
                        src={assets.menuIcon}
                        alt="Menu"
                        className={`h-4 ${isScrolled ? "invert" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center gap-7 transition-transform duration-300 ${isMenuOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <button
                    className="absolute top-5 right-5"
                    onClick={() =>
                        setIsMenuOpen(false)
                    }
                    aria-label="Close Menu"
                >
                    <img
                        src={assets.closeIcon}
                        alt="Close Menu"
                        className="h-6"
                    />
                </button>

                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() =>
                            setIsMenuOpen(false)
                        }
                        className="text-lg"
                    >
                        {link.name}
                    </NavLink>
                ))}

                {user && (
                    <button
                        onClick={() => {
                            handleHotelClick();
                            setIsMenuOpen(false);
                        }}
                        className="border px-5 py-2 rounded-full"
                    >
                        {isOwner
                            ? "Dashboard"
                            : "List Your Hotel"}
                    </button>
                )}

                {!user && (
                    <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;