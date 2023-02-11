import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

//styles
import "./styles/calendar.css";
import "./styles/modal.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./index.css";

import { router } from "./router";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
