import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/calendar.css";
import "./styles/modal.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./index.css";
import { router } from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
