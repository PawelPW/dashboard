"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BarChart, ListChecks, AppWindowIcon, ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("progress");
  const [userName, setUserName] = useState("Loading...");
  const [profilePicture, setProfilePicture] = useState("http://www.w3.org/2000/svg");
  const [profileRank, setProfileRank] = useState("Rookie");
  const [isLearningCenterOpen, setIsLearningCenterOpen] = useState(false);

  const router = useRouter();

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const picture = localStorage.getItem("profilePicture");
    name ? setUserName(name) : "Unknown";
    if (picture) {
      setProfilePicture(picture);
    }
  }, []);

  // Reusable function to create list items
  const createListItem = (
    label: string,
    icon: React.ReactNode,
    tab: string,
    path: string
  ) => (
    <li
      className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
        activeTab === tab ? "bg-gray-300" : ""
      }`}
      onClick={() => handleNavigation(tab, path)}
    >
      {icon} {label}
    </li>
  );

  return (
    <nav className="w-64 bg-white p-5 shadow-md">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={profilePicture}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-gray-500">{profileRank}</p>
        </div>
      </div>

      {/* Navigation Items */}
      <h1 className="text-xl font-bold mb-6">📌 Learning Dashboard</h1>
      <ul>
        {createListItem("Progress", <BarChart size={18} />, "dashboard", "/dashboard")}
        {createListItem("Test Playground", <ListChecks size={18} />, "test-playground", "/test-playground")}
        {createListItem("SQL Challenges", <AppWindowIcon size={18} />, "sql-challenges", "/sql-challenges")}
        {createListItem("Test Simulator", <AppWindowIcon size={18} />, "test-simulator", "/test-simulator")}
        {createListItem("Settings", <AppWindowIcon size={18} />, "settings", "/settings")}

        {/* Learning Center Parent Item */}
        <li>
          <div
            className={`p-3 flex items-center justify-between cursor-pointer rounded-lg hover:bg-gray-200 ${
              activeTab === "learning center" ? "bg-gray-300" : ""
            }`}
            onClick={() => setIsLearningCenterOpen(!isLearningCenterOpen)}
          >
            <div className="flex items-center gap-2">
              <AppWindowIcon size={18} /> Learning Center
            </div>
            {isLearningCenterOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>

          {/* Learning Center Submenu */}
          {isLearningCenterOpen && (
            <ul className="ml-6 mt-2">
              {createListItem("Materials", "📚", "materials", "/learning-center/materials")}
              {createListItem("Quizzes", "📝", "quizzes", "/learning-center/quizzes")}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}