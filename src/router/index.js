import Home from "../component/Home"
import Order from "../component/Order"
import Ticket from "../component/Ticket"
import Seats from "../component/Seats";
import BuyTicket from "../component/BuyTicket";
import OrderFilling from "../component/OrderFilling"
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
    }, {
        path: "/Seats",
        element: <Seats />
    },
    {
        path: "/BuyTicket",
        element: <BuyTicket />
    },
    {
        path: "/OrderFilling",
        element: <OrderFilling />
    },

]
export default router