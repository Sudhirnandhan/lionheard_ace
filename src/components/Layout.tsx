import { ReactNode } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import heroEyesBg from "@/assets/hero-eyes-bg.jpg";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background with Lion Eyes - Global for consistency */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url(${heroEyesBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background/98" />

                {/* Particles / Stars effect */}
                <div className="absolute inset-0 particles-bg" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-screen p-4 gap-4">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Dashboard Area */}
                <main className="flex-1 flex flex-col gap-4 overflow-hidden">
                    {/* Header */}
                    <Header />

                    {/* Page Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
