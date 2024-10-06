import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import React from "react";
import "../index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//console.log(searchCompanies("tsla"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
