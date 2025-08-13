import React, {useContext} from "react"
import {Menu} from "lucide-react";
import {AuthContext} from "@/context/AuthContext.ts";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar}) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    if (!authContext) {
        throw new Error('You must provide AuthContext.');
    }

    const {user, logout, isAuthenticated} = authContext;
    const username = user?.username || "";
    const handleLoginClick = () => {
        navigate("/login");
    }
    return (
        <header className="bg-blue-100 shadow px-4 py-3 flex items-center justify-between pl-4 lg:pl-72">
            <div className="flex items-center space-x-4">
                <button
                    className="lg:hidden p-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <Menu className= "text-blue-700 w-6 h-6" />
                </button>

                <h1 className="text-xl font-semibold text-blue-900">Insurance App</h1>
            </div>

            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
            <span className="text-blue-800">
              Welcome! <strong>{username}</strong>
            </span>
                        <button
                            onClick={logout}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header;