"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, ListChecks, BarChart, AppWindowIcon } from "lucide-react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("progress");
  const [userName, setUserName] = useState("Loading..."); // Default state for the user's name
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150"); // Placeholder for profile picture
  const router = useRouter();

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  useEffect(() => {
    // Fetch user profile data from localStorage or API
    const name = localStorage.getItem("name");
    const picture = localStorage.getItem("profilePicture");
    name ? setUserName(name) : "Unknown" ; // Fallback to "User" if name is not found
    if (picture) {
      setProfilePicture(picture); // Set the profile picture from localStorage
    }
  }, []);

  return (
    <nav className="w-64 bg-white p-5 shadow-md">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={profilePicture}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* User Name */}
        <div>
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-gray-500">Learning Enthusiast</p>
        </div>
      </div>

      {/* Navigation Items */}
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
            activeTab === "settings" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleNavigation("settings", "/settings")}
        >
          <AppWindowIcon size={18} /> Settings
        </li>
      </ul>
    </nav>
  );
}
