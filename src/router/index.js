import Home from "../component/Home"
import Order from "../component/Order"
import Ticket from "../component/Ticket"
import { Navigate } from "react-router-dom";

const router = [
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/order",
        element: <Order />
    },
    {
        path: "/ticket",
        element: <Ticket />
    },
]
export default router