import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";

import DashboardLayout from "../Layouts/DashboardLayout";
import DashHome from "../Pages/Dashboard/DashHome/DashHome";
import AllUsers from "../Pages/Dashboard/All-Users/AllUsers";
import CreateRequest from "../Pages/Dashboard/CreateDonatReq/CreateRequest";
import MyDonReq from "../Pages/Dashboard/MyDonReq/MyDonReq";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import EditReq from "../Pages/Dashboard/EditRequest/EditReq";
import AllDonationReq from "../Pages/Dashboard/AllDonationReq/AllDonationReq";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Details from "../Pages/DonationRequests/Details";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/ContentManagement/AddBlog";
import EditContent from "../Pages/Dashboard/ContentManagement/EditContent";
import Blog from "../Pages/Blog/Blog";
import Search from "../Pages/Search/Search";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <div>error 404</div>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'donation-request',
                element: <DonationRequests></DonationRequests>,
            },
            {
                path: 'donation-request/details/:id',
                element: <PrivateRoute><Details></Details></PrivateRoute>,
            },
            {
                path: 'all-blogs',
                element: <Blog></Blog>,
            },
            {
                path: 'search',
                element: <Search></Search>
            },

        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'home',
                element: <DashHome></DashHome>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'create-donation-request',
                element: <CreateRequest></CreateRequest>
            },
            {
                path: 'my-donation-request',
                element: <MyDonReq></MyDonReq>
            },
            {
                path: 'edit/:id',
                element: <EditReq></EditReq>,
            },
            // Mixed Route with access
            {
                path: 'content-management',
                element: <ContentManagement></ContentManagement>
            },
            // Admin/Volunteer routes:
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-blood-donation-request',
                element: <AdminRoute><AllDonationReq></AllDonationReq></AdminRoute>
            },
            {
                path: 'content-management/add-blog',
                element: <AdminRoute><AddBlog></AddBlog></AdminRoute>
            },
            {
                path: '/dashboard/edit-content/:id',
                element: <AdminRoute><EditContent></EditContent></AdminRoute>
            },
        ]

    }
])

