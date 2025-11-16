import { Link } from "react-router-dom";
import AppFooter from "./Footer";
import { Home } from "lucide-react";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-blue-950 text-white px-4 py-2 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg">
                    Funds Management
                </Link>
                <nav className="text-xs">
                    <Link to="/" className="hover:underline">
                        <Home className="w-4 h-4" />
                    </Link>
                </nav>
            </header>

            <main className="flex-1 px-6 py-4 max-w-5xl w-full mx-auto">
                {children}
            </main>
            <AppFooter />
        </div>
    );
}


export default Layout;