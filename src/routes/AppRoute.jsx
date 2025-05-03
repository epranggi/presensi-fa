import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import { Dashboard } from "../pages/Dashboard";
import { Profile } from "../pages/Profile";
import { ProfileEdit } from "../pages/ProfileEdit";
import { Presence } from "../pages/Presence";
import { PresenceAdd } from "../pages/PresenceAdd";
import { Members } from "../pages/Members";
import { RecapHonor } from "../pages/RecapHonor";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestRoute>
            <HomePage></HomePage>
        </GuestRoute>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <GuestRoute>
            <LoginPage></LoginPage>
        </GuestRoute>,
    },
    {
        path: "/register",
        element: <GuestRoute>
            <RegisterPage></RegisterPage>
        </GuestRoute>,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute>
            <Dashboard></Dashboard>
        </ProtectedRoute>,
    },
    {
        path: "/profile",
        element: <ProtectedRoute>
            <Profile></Profile>
        </ProtectedRoute>,
    },
    {
        path: "/profile/edit",
        element: <ProtectedRoute>
            <ProfileEdit></ProfileEdit>
        </ProtectedRoute>,
    },
    {
        path: "/presence",
        element: <ProtectedRoute>
            <Presence></Presence>
        </ProtectedRoute>,
    },
    {
        path: "/presence/add",
        element: <ProtectedRoute>
            <PresenceAdd></PresenceAdd>
        </ProtectedRoute>,
    },
    {
        path: "/members",
        element: <ProtectedRoute>
            <AdminRoute>
                <Members></Members>
            </AdminRoute>
        </ProtectedRoute>,
    },
    {
        path: "/recap-honor",
        element: <ProtectedRoute>
            <AdminRoute>
                <RecapHonor></RecapHonor>
            </AdminRoute>
        </ProtectedRoute>,
    },
])