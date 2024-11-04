import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext";
import Layout from "./components/Layout";
import LoadingIndicator from "./components/LoadingIndicator";

// ใช้ lazy สำหรับการโหลดหน้าแบบ Lazy Load
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));
const Project = lazy(() => import("./pages/Project"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "project",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <Project />
          </Suspense>
        ),
      },
    ],
  },
]);

// เริ่มการ render
createRoot(document.getElementById("root")!).render(
  <AudioProvider>
    <RouterProvider router={router} />
  </AudioProvider>
);
