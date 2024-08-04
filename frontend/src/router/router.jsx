import Basket from "../Pages/Basket/Basket"
import Detail from "../Pages/Detail/Detail"
import Home from "../Pages/Home/Home"
import Wishlist from "../Pages/Wishlist/Wishlist"
import UseRoot from "../Components/useRoot/index"
import Pages from "./../Pages/Add/Add"
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
    }
]