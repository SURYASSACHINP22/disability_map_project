import React from "react";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./Sidebar";
import { Outlet, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Plus,
    GitFork,
    BarChart3,
    Settings,
    Minus,
    StarHalf,
    User
  } from "lucide-react";
  export default function Layout  () {
  return (
    <div className = "flex h-screen bg-gradient-to-r from-[#d4c084] to-[#e60202]">
    <Sidebar>
    <SidebarItem 
          icon={<User size={20} />}
          text='Account'
        />
        <SidebarItem 
          icon={<LayoutDashboard size={20} />}
          text='Location'
          path="/"
          active
        /> 
        <SidebarItem 
        icon={<Plus size={20} />}
        text="Restaurants"
        path="/upload"
        />
        <SidebarItem 
          icon={<Settings size={20} />}
          text='Malls'
        />
     </Sidebar>  
     <div className="flex-grow bg-gradient-to-r from-[#d4c084] to-[#e60202] p-4">
        <Outlet /> {/* This renders the active page content */}
      </div>
 </div>
  );
}