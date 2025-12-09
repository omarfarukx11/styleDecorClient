import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivetRoute from "./PrivetRoute";
import NotFound from "../Components/NotFound";
import About from "../Pages/About/About";
import Contact from "../Pages/Contract/Contract";
import AllServices from "../Pages/Services/allServices";
import ServiceDetails from "../Pages/Services/ServiceDetails";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import MyProfile from "../Pages/MyProfile/MyProfile";




export const router = createBrowserRouter([
    {
        path:"/",
        Component:RootLayout,
        errorElement:<NotFound></NotFound>,
        children:[
            {
            index: true,
            Component: Home,
            },
            {
            path:'/services',
            Component:AllServices,
            },
            {
            path:'/about',
            Component:About,
            },
            {
            path:'/contact',
            Component:Contact,
            },
            {
            path:'/serviceDetails/:id',
            Component:ServiceDetails,
            },
            {
            path:'/my-profile',
            Component:MyProfile,
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
        path:"/dashboard",
        element:<PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                path:'/dashboard/my-bookings',
                Component:MyBookings
            },
            {
                path:'/dashboard/payment-history',
                Component:PaymentHistory
            },
            
        ]
    },

])