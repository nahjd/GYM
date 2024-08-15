import Basket from "../Pages/Basket/Basket"
import Detail from "../Pages/Detail/Detail"
import Home from "../Pages/Home/Home"
import Wishlist from "../Pages/Wishlist/Wishlist"
import UseRoot from "../Components/useRoot/index"
import Notification from "../Pages/Admin/Notfication"
import AdminRoot from "../Pages/Admin/AdminRoot"
import Dashboard from "../Pages/Admin/Dashboard"
import AddUser from "../Pages/Admin/AddUser"
import AdminNavbar from "../Pages/Admin/Navbar"
import Blog from "../Components/Blog/Blog"
import EditUser from "../Pages/Admin/AdminEdit"
// import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import AdminLogin from "../Pages/Admin/AdminLogin"
import Sucess from "../Components/Sucess"
import Cancel from "../Components/Cancel"

export const routes = [
    {
        path: "/",
        element: <UseRoot />,
        children: [
            // {
            //     path: "/",
            //     element: <Login />
            // },
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/blog",
                element: <Blog />
            },

            {
                path: "/wishlist",
                element: <Wishlist />
            },
            {
                path: "/basket",
                element: <Basket />
            },
            {
                path: "/:id",
                element: <Detail />
            },
            {
                path: "/sucess",
                element: <Sucess />
            },
            {
                path: "/cancel",
                element: <Cancel />
            },

        ]
    }, {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: "/admin/admin",
                element: <Dashboard />
            },
            {
                path: "/admin/login",
                element: <AdminLogin />
            },
            {
                path: "/admin/adminUsers",
                element: <AddUser />
            },
            {
                path: "/admin/:id",
                element: <Detail />
            },
            {
                path: "/admin/adminNot",
                element: <Notification />
            },
            {
                path: "/admin/navbar",
                element: <AdminNavbar />
            },
            {
                path: "/admin/edit/:id",
                element: <EditUser />
            },

        ]
    }
]