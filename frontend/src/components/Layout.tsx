import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import HomeBTN from "./HomeBTN";

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      {location.pathname === "/" || location.pathname === "/home" ? null : (
        <HomeBTN />
      )}
      <AudioPlayer />
      <Outlet />
    </div>
  );
};

export default Layout;
