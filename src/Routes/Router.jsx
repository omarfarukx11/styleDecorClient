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
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory/PaymentHistory";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AdminRoute from "./AdminRoute";
import ManageDecorators from "../Pages/Dashboard/Admin/MangeDecorators/ManageDecorators";
import ManageServices from "../Pages/Dashboard/Admin/ManageServices/ManageServices";
import AllBookings from "../Pages/Dashboard/Admin/AllBookings/AllBookings";
import Revenue from "../Pages/Dashboard/Admin/Revenue/Revenue";
import Analytics from "../Pages/Dashboard/Admin/Analytics/Analytics";
import UserRoute from "./UserRoute";
import DecoratorRoute from "./DecoratorRoute";
import MyProject from "../Pages/Dashboard/Decorators/MyProject/MyProject";
import MyBookings from "../Pages/Dashboard/User/MyBookings/MyBookings";
import TodaySchedule from "../Pages/Dashboard/Decorators/TodaySchedule/TodaySchedule";
import MyEarnings from "../Pages/Dashboard/Decorators/MyEarnings/MyEarnings";
import AddNewService from "../Pages/Dashboard/Admin/AddNewService/AddNewService";
import AddNewDecorators from "../Pages/Dashboard/Admin/MangeDecorators/AddNewDecorators";
import AllPaymentHistory from "../Pages/Dashboard/Decorators/AllPaymentHistory/AllPaymentHistory";
import Loader from "../Components/Loader";




export const router = createBrowserRouter([
    {
        path:"/",
        Component:RootLayout,
        errorElement:<NotFound></NotFound>,
        hydrateFallbackElement:<Loader></Loader>,
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
            },
            {
            path: "*",
            Component: NotFound,
         },
        ]
    },
    {
        path:"/dashboard",
        element:<PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                index : true ,
                element:<MyProfile></MyProfile>
            },
             {
                path:"/dashboard/my-profile",
                element:<MyProfile></MyProfile>
            },
            {
                path:'/dashboard/my-bookings',
                element:<UserRoute><MyBookings></MyBookings></UserRoute>
            },
            {
                path:'/dashboard/payment-history',
                element:<UserRoute><PaymentHistory></PaymentHistory></UserRoute>
            },

            
            {
                path:"/dashboard/my-projects",
                element:<DecoratorRoute><MyProject></MyProject></DecoratorRoute>
            },
            {
                path:"/dashboard/today-schedule",
                element:<DecoratorRoute><TodaySchedule></TodaySchedule></DecoratorRoute>
            },
            {
                path:"/dashboard/my-earnings",
                element:<DecoratorRoute><MyEarnings></MyEarnings></DecoratorRoute>
            },
            {
                path:"/dashboard/all-payment-history",
                element:<DecoratorRoute><AllPaymentHistory></AllPaymentHistory></DecoratorRoute>
            },
           



            {
                path:"/dashboard/manage-decorators",
                element:<AdminRoute><ManageDecorators></ManageDecorators></AdminRoute>
            },
            {
                path:"/dashboard/manage-services",
                element:<AdminRoute><ManageServices></ManageServices></AdminRoute>
            },
            {
                path:"/dashboard/all-bookings",
                element:<AdminRoute><AllBookings></AllBookings></AdminRoute>
            },
            {
                path:"/dashboard/revenue",
                element:<AdminRoute><Revenue></Revenue></AdminRoute>
            },
            {
                path:"/dashboard/analytics",
                element:<AdminRoute><Analytics></Analytics></AdminRoute>
            },
            {
                path:"/dashboard/add-new-service",
                element:<AdminRoute><AddNewService></AddNewService></AdminRoute>
            },
            {
                path:"/dashboard/add-new-decorator",
                element:<AdminRoute><AddNewDecorators></AddNewDecorators></AdminRoute>
            },
            
            
        ]
    },
])