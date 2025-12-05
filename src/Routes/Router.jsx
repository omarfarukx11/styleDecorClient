import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Services from "../Pages/Services/Services";

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
            path:'/login',
            Component:Login,
            },
            {
            path:'/register',
            Component:Register,
            },
            {
            path:'/services',
            Component:Services,
            },
        ]
    }
])