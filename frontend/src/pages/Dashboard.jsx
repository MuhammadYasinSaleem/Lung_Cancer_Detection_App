import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import Profile from "../Views/Profile";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentView, setCurrentView] = useState("Profile");
  const [isOpen, setIsOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "Profile":
        return <Profile />;
      case "AI Doctor":
        return <div>AI Doctor</div>;
      case "ChatBot":
        return <div>ChatBot</div>;
      default:
        return <div>Invalid View</div>;
    }
  };
    const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          setCurrentView={setCurrentView}
        />
        {/* Main Content */}
        <div className="main-container" onClick={toggleDropdown}>
          {/* <DashboardNavbar
            setShowSidebar={setShowSidebar}
            navDropDown={navDropDown}
            setNavDropDown={setNavDropDown}
          /> */}
          <main className="main-content">
            {renderView()}{" "}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
