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
        path: "/profile",
        element: <Profile></Profile>,
    },
    {
        path: "/profile/edit",
        element: <ProfileEdit></ProfileEdit>,
    },
    {
        path: "/presence",
        element: <Presence></Presence>,
    },
    {
        path: "/presence/add",
        element: <PresenceAdd></PresenceAdd>,
    },
    {
        path: "/members",
        element: <Members></Members>,
    },
    {
        path: "/recap-honor",
        element: <RecapHonor></RecapHonor>,
    },
])