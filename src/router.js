import VueRouter from "vue-router";

import Home from "./pages/home";
import Chatroom from "./pages/chatroom";

const router = new VueRouter({
  routes: [
    { name: "chatroom", path: "/chatroom", component: Chatroom },
    { name: "home", path: "/", component: Home }
  ]
});

export default router;
