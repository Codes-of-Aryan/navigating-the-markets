import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdBarChart, MdPerson, MdOutlineShoppingCart } from "react-icons/md";
import Widget from "views/admin/widgetPage";
import AlgorithmicTrading from "views/admin/algorithmicTradingPage";

const routes = [
    {
        name: "Widgets",
        layout: "/admin",
        path: "/default",
        icon: (
            <Icon
                as={MdOutlineShoppingCart}
                width="20px"
                height="20px"
                color="inherit"
            />
        ),
        component: Widget,
        secondary: true,
    },
    {
        name: "Algorithmic Trading",
        layout: "/admin",
        icon: (
            <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: "/algotrading",
        component: AlgorithmicTrading,
    },
    {
        name: "FinGPT",
        layout: "/admin",
        path: "/fingpt",
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        // component: FinGPT,
    },
];

export default routes;
