<template>
    <div id="app">
        <navbar :pages="pages"></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    name: "App",
    components: {
        Navbar
    },
    data() {
        return {
            pages: [
                { title: "Chatroom", path: "/chatroom" },
                { title: "Profile", path: "/profile" }
            ]
        };
    }
};
</script>
