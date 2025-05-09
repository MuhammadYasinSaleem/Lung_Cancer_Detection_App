import React, { useState } from "react";
import Sidebar from "../components/SideBar";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentView, setCurrentView] = useState("Profile");
  const [isOpen, setIsOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "Profile":
        return (
          <div>
            <h1>Profile</h1>
          </div>
        );
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
            {/* Or renderAdminView(), depending on your actual role */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// <div
//         className="flex-1 flex flex-col bg-white md:ml-64 w-full"
//         onClick={toggleDropdown}
//       >
//         {/* Navbar */}
//         <DashboardNavbar setShowSidebar={setShowSidebar} navDropDown={navDropDown} setNavDropDown={setNavDropDown} />

//         {/* Main Content Body */}
//         <main className="flex-1 p-1 w-full">
//           {user.user.role === "employee" ? (
//             // <UserDashboard setShowSidebar={setShowSidebar} setNavDropDown={setNavDropDown}/>
//             renderUserView()
//           ) : user.user.role === "admin" ? (
//             renderAdminView()
//           ) : null}
//         </main>
//       </div>

//   <div className="main-container" onClick={toggleDropdown}>
//   <DashboardNavbar setShowSidebar={setShowSidebar} navDropDown={navDropDown} setNavDropDown={setNavDropDown} />
//   <main className="main-content">
//     {user.user.role === "employee" ? renderUserView() : user.user.role === "admin" ? renderAdminView() : null}
//   </main>
// </div>
