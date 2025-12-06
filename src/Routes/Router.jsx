import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Services from "../Pages/Services/Services";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivetRoute from "./PrivetRoute";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:RootLayout,
        children:[
            {
            index: true,
            Component: Home,
            },
            {
            path:'/services',
            Component:Services,
            },
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children: [
            {
                path:'/login',
                Component:Login,
            },
            {
            path:'/register',
            Component:Register
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>
    }
])