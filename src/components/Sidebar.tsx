"use client";

import { useRouter } from "next/navigation";
import { Home, ListChecks, BarChart, AppWindowIcon} from "lucide-react"
import { useState } from "react";

export default function Sidebar(){
    const [activeTab, setActiveTab] = useState("progress")
    const router = useRouter();

    const handleNavigation = (tab: string, path: string) => {
        setActiveTab(tab);
        router.push(path);
    };
    return (
        <nav className="w-64 bg-white p-5 shadow-md">
          <h1 className="text-xl font-bold mb-6">📌 Learning Dashboard</h1>
          <ul>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "dashboard" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("dashboard", "/dashboard")}
            >
              <BarChart size={18} /> Progress
            </li>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "test-playground" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("test playground", "/test-playground")}
            >
              <ListChecks size={18} /> Test Playground
            </li>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "sql challenges" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("sql challenges", "/sql-challenges")}
            >
              <AppWindowIcon size={18} /> SQL Challenges	
            </li>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "test simulator" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("test simulator", "/test-simulator")}
            >
              <AppWindowIcon size={18} /> Test Simulator	
            </li>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "Settings" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("settings", "/settings")}
            >
              <AppWindowIcon size={18} /> Settings	
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>
    );
}
