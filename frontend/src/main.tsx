import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { AudioProvider } from "./context/AudioContext";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Project from "./pages/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "project",
        element: <Project />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioProvider>
      <RouterProvider router={router} />
    </AudioProvider>
  </StrictMode>
);
