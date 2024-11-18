import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import '../../styles/layout/Layout.css';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar onSidebarToggle={setIsSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;