import React from "react";
import ReactDOM from "react-dom/client";

//styles
import "./styles/calendar.css";
import "./styles/modal.css";
import "./index.css";

import { CalendarApp } from "./CalendarApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);
