import React from "react";
import {Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleSidebar}: SidebarProps) => {
    const location = useLocation();

    const links = [
        {to: "/", label: "Customers"},
        {to: "/add-customer", label: "Add a new Customer"},
        {to: "/add-car",  label: "Add a new Car"},
        {to: "/cars", label: "Cars"},
        {to: "/policies", label: "Insurance Policies"},
        {to: "/add-insurance-policy", label: "Add a new Insurance Policy"},
        {to: "/my-policies", label: "My  Insurance Policies"},
    ];

    return(
        <>
            { /* Mobile Open */}
            {isOpen && (
                <div className= "fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-40 lg:hidden"
                     onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}

            <aside className={`
                                bg-blue-600 text-white w-full lg:w-64 shadow-lg
                                transform transition-transform duration-300 
                                flex flex-col
                                lg:static lg:translate-x-0 lg:block
                                 ${isOpen ? "fixed z-50 top-0 left-0 translate-x-0" : "fixed z-50 top-0 left-0 -translate-x-full"}
                                    lg:relative
            `}>
                <div className = "flex items-center justify-between p-4 lg:hidden">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={toggleSidebar}
                        className = "text-white hover:text-blue-200"
                        aria-label = "Close sidebar">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}

                <nav className= "flex-1 overflow-auto px-4 pb-4 space-y-2 py-2">
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={toggleSidebar}
                            className={`block px-4 py-2 rounded-md hover:bg-blue-500 transition-colors ${location.pathname === link.to ? "bg-blue-700" : ""}`}
                            >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

        </>
    )
}

export default Sidebar