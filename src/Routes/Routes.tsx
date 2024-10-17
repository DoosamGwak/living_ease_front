import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
// import AIMatch from "../Pages/AIMatch/AIMatch";
import AIRecommend from "../Pages/AIRecommend/AIRecommend";
import AIMnR from "../Pages/AIMnR/AIMnR";
import InfoBoard from "../Pages/InfoBoard/InfoBoard";
import ProtectedRoute from "./ProtectedRoute";
import LocationPage from "../Pages/LocationPage/LocationPage";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import SupportPage from "../Pages/SupportPage/SupportPage";
import { NavermapsProvider } from "react-naver-maps";
import { handleGoogleCallback } from "../Services/AuthAPI";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import AIChatPage from "../Pages/AIChatPage/AIChatPage";
import IntroPage from "../Pages/IntroPage/IntroPage";
import ProfileEditPage from "../Pages/ProfileEditPage/ProfileEditPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "",
        element: <IntroPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/google-callback",
        loader: handleGoogleCallback,
        element: <div>Loading...</div>,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        ),
      },
      { path: "info/:categoryName", element: <InfoBoard /> },
      { path: "community/:categoryName", element: <CommunityPage /> },
      { path: "support/:categoryName", element: <SupportPage /> },
      {
        path: "location",
        element: (
          <NavermapsProvider
            ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID}
          >
            <LocationPage />
          </NavermapsProvider>
        ),
      },
      {
        element: <AIMnR />,
        children: [
          // {
          //   path: "aimatch",
          //   element: <AIMatch />,
          // },
          {
            path: "airecommend",
            element: (
              <ProtectedRoute>
                <AIRecommend />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "aichat",
        element: <AIChatPage />,
      },
    ],
  },
]);
