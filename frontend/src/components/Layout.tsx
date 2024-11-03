import React from "react";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <AudioPlayer />
      <Outlet />
    </div>
  );
};

export default Layout;
