<template>
    <div id="app">
        <navbar :pages="pages"></navbar>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
    name: "App",
    components: {
        Navbar,
        AppFooter: Footer
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
