import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthStore();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleProfileNavigate = () => {
        if (user.role === "admin") {
            navigate('/admin-panel');
        }
        else if (user.role === "host") {
            navigate('/host-panel');
        }
        else if (user.role === "guest") {
            navigate('/user-profile');
        }
    };

    const handleLogOut = (path) => {
        setUser(null);
        localStorage.removeItem('token');
        navigate(path);
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-black p-2">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <img src="/assets/airbnb.png" alt="Logo" className="h-20 w-40" />
                </Link>

                <ul className="space-x-4 items-center">
                    <li className="relative">
                        <FaUserCircle className="text-white text-4xl cursor-pointer" onClick={toggleDropdown} />

                        {isDropdownOpen && !user && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-2 border-white border-2">
                                <a onClick={() => handleNavigate('/signup')} className="block px-4 py-2 text-white text-xl hover:bg-gray-700 rounded">Sign Up</a>
                                <a onClick={() => handleNavigate('/login')} className="block px-4 py-2 text-white text-xl hover:bg-gray-700 rounded">Login</a>
                            </div>
                        )}
                        {isDropdownOpen && user && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-2 border-white border-2">
                                <a onClick={() => handleProfileNavigate()} className="block px-4 py-2 text-white text-xl hover:bg-gray-700 rounded">Profile</a>
                                <a onClick={() => handleLogOut('/')} className="block px-4 py-2 text-white text-xl hover:bg-gray-700 rounded">Logout</a>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;