import Basket from "../Pages/Basket/Basket"
import Detail from "../Pages/Detail/Detail"
import Home from "../Pages/Home/Home"
import Wishlist from "../Pages/Wishlist/Wishlist"
import UseRoot from "../Components/useRoot/index"
import Pages from "./../Pages/Add/Add"
import AdminRoot from "../Pages/Admin/AdminRoot"
import Dashboard from "../Pages/Admin/Dashboard"
import AddUser from "../Pages/Admin/AddUser"
// import Login from "../Pages/Login/Login"
// import Register from "../Pages/Register/Register"

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
            // {
            //     path: "/register",
            //     element: <Register />
            // },

            {
                path: "/pages",
                element: <Pages />
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
        ]
    }, {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: "/admin",
                element: <Dashboard />
            },
            {
                path: "/adminUsers",
                element: <AddUser />
            },
            {
                path: "/admin/:id",
                element: <Detail />
            },
            {
                path: "/adminNot",
                element: <Notification />
            },
        ]
    }
]