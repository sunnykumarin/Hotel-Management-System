import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const location = useLocation();

    const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10 || location.pathname !== "/");
        };

        handleScroll(); // run initially
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <Link to="/">
                <img
                    src={assets.logo}
                    alt="Roomora"
                    className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`}
                />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}
                    >
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                {user && (
                    <button
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                    >
                        {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>
                )
                }
            </div>

            {/* Right */}
            <div className="hidden md:flex items-center gap-4">
                <img
                    src={assets.searchIcon}
                    alt="search"
                    className={`${isScrolled ? 'invert' : ''} h-7`}
                />

                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className={`px-8 py-2.5 rounded-full ml-4 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 md:hidden">
                {user && <UserButton />}
                <img
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={assets.menuIcon}
                    alt=""
                    className={`${isScrolled ? 'invert' : ''} h-4`}
                />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 transition-all ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4">
                    <img src={assets.closeIcon} alt="" className="h-6" />
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {user && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}>
                    {isOwner ? 'Dashboard' : 'List Your Hotel'}

                </button>
                }

                {!user && (
                    <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;