import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AIMatch from "../Pages/AIMatch/AIMatch";
import AIRecommend from "../Pages/AIRecommend/AIRecommend";
import AIMnR from "../Pages/AIMnR/AIMnR";
import InfoBoard from "../Pages/InfoBoard/InfoBoard";
import ProtectedRoute from "./ProtectedRoute";
import LocationPage from "../Pages/LocationPage/LocationPage";
import ComunityPage from "../Pages/ComunityPage/ComunityPage";
import CSRPage from "../Pages/CSRPage/CSRPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "info", element: <InfoBoard /> },
      { path: "comunity", element: <ComunityPage /> },
      { path: "location", element: <LocationPage /> },
      { path: "csr", element: <CSRPage /> },
      {
        element: <AIMnR />,
        children: [
          { path: "aimatch", element: <AIMatch /> },
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
    ],
  },
]);
