import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import DividerCustom from "./components/DividerCustom";
import Currency from "./pages/Currency";
import TapCoin from "./pages/TapCoin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/currency",
    element: <Currency />,
  },

  {
    path: "/tap-coin",
    element: <TapCoin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);