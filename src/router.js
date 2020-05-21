import VueRouter from "vue-router";

import { authGuard } from "./auth/authGuard";

import Home from "./pages/home";
import Chatroom from "./pages/chatroom";
import Profile from "./pages/profile";

const router = new VueRouter({
    routes: [
        { name: "chatroom", path: "/chatroom", component: Chatroom },
        { name: "profile", path: "/profile", component: Profile, beforeEnter: authGuard },
        { name: "home", path: "/", component: Home }
    ]
});

export default router;
