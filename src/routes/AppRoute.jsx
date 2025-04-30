import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import { Dashboard } from "../pages/Dashboard";
import { DashboardAdmin } from "../pages/DashboardAdmin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
    },
    {
        path: "/dashboard-admin",
        element: <DashboardAdmin></DashboardAdmin>,
    },
])