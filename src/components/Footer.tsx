import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-100 text-blue-900 text-sm py-4 px-6 shadow-inner">
            <div className="flex justify-center items-center text-center w-full">
                <span>
                    &copy; {new Date().getFullYear()} Insurance App. All rights reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
