import VueRouter from "vue-router";

import { authGuard } from "./auth/authGuard";

import Home from "./pages/Home";
import Chatroom from "./pages/Chatroom";
import Profile from "./pages/Profile";

const router = new VueRouter({
    routes: [
        { name: "chatroom", path: "/chatroom", component: Chatroom, beforeEnter: authGuard },
        { name: "profile", path: "/profile", component: Profile, beforeEnter: authGuard },
        { name: "home", path: "/", component: Home }
    ]
});

export default router;
