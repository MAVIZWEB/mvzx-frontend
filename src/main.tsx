 import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";
import Stake from "./pages/Stake";
import Withdraw from "./pages/Withdraw";
import Referral from "./pages/Referral";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="p-8 text-center text-red-600 font-bold">
        ⚠️ Page Not Found
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "purchase", element: <Purchase /> },
      { path: "stake", element: <Stake /> },
      { path: "withdraw", element: <Withdraw /> },
      { path: "referral", element: <Referral /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
