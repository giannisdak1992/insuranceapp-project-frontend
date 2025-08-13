import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header
                toggleSidebar={toggleSidebar}

            />

            {/* Sidebar + Main */}
            <div className="flex flex-1 min-h-0">
                {/* Sidebar – συμμετέχει στο flex και έχει full height */}
                <Sidebar  isOpen={isSidebarOpen} toggleSidebar={closeSidebar} />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
