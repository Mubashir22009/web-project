import { faHome, faSignIn, faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

const NavBar = () => {

    const [userMenuVisible, setUserMenuVisible] = useState(false);

    const toggleUserMenu = () => {
        setUserMenuVisible(!userMenuVisible);
    }

    return (
        <nav className="bg-white shadow-md py-4 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    <a href="/">
                        <FontAwesomeIcon icon={faHome} /> AirDnd
                    </a>
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
                    <a href="/experiences" className="text-gray-600 hover:text-gray-800">Experiences</a>
                </div>
                <div className="flex relative">
                    <div onClick={toggleUserMenu} className="cursor-pointer p-2">
                        <FontAwesomeIcon icon={faUserAlt} />
                    </div>
                    {userMenuVisible && (
                        <div className="absolute top-16 right-0 bg-white shadow-md w-48 py-2 rounded-md">
                            <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                <FontAwesomeIcon icon={faSignIn} /> Login
                            </a>
                            <a href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                <FontAwesomeIcon icon={faUserCircle} /> Sign Up</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;