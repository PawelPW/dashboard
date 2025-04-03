"use client";

import { useRouter } from "next/navigation";
import { Home, ListChecks, BarChart} from "lucide-react"
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
                activeTab === "progress" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("progress", "/progress")}
            >
              <BarChart size={18} /> Progress
            </li>
            <li
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                activeTab === "tests" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleNavigation("tests", "/tests")}
            >
              <ListChecks size={18} /> Test Playground
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>
    );
}
