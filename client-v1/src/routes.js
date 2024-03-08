import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdBarChart, MdPerson, MdOutlineShoppingCart, MdChat, MdLogin } from "react-icons/md";
import Widget from "views/admin/widgetPage";
import AlgorithmicTrading from "views/admin/algorithmicTradingPage";
import DiscussionForum from "views/admin/discussionForum";
import SignUpLogin from "views/admin/signUpLogin";

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
    {
        name: "Sign Up / Login",
        layout: "/admin",
        path: "/signUp-login",
        icon: <Icon as={MdLogin} width="20px" height="20px" color="inherit" />,
        component: SignUpLogin,
    },
    // {
    //     name: "Discussion Forum",
    //     layout: "/admin/signUp-login",
    //     path: "/forum",
    //     icon: <Icon as={MdLogin} width="20px" height="20px" color="inherit" />,
    //     component: DiscussionForum,
    // },
    {
        name: "Discussion Forum",
        layout: "/admin",
        path: "/forum",
        icon: <Icon as={MdChat} width="20px" height="20px" color="inherit" />,
        component: DiscussionForum,
    },
];

export default routes;
