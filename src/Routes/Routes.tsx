import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AIMatch from "../Pages/AIMatch/AIMatch";
import AIRecommend from "../Pages/AIRecommend/AIRecommend";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "aimatch", element: <AIMatch /> },
      { path: "airecommend", element: <AIRecommend /> },
    ],
  },
]);
