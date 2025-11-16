import React from "react";

function AppFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300 text-xs font-serif">
            <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
                <div></div>
                <div className="text-center text-gray-400 text-[8px]">
                    Website built with Spring Boot, Kotlin, React and MongoDB
                </div>
                <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1">
                        <span className="text-[10px]">©</span>
                        <span className="text-[8px]">{new Date().getFullYear()} Funds Management</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;