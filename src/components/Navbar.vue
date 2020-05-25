<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item href="/">
                <img src="../assets/logo.png" alt="Coffee Shop Talk" />
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item
                tag="router-link"
                v-for="page in pages"
                :key="page.title"
                :to="page.path"
            >{{ page.title }}</b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-dropdown hoverable>
                <div slot="label">
                    <p v-if="$auth.isAuthenticated">Hi, {{ $auth.user.nickname }}!</p>
                    <p v-else>Account</p>
                </div>
                <div v-if="$auth.isAuthenticated">
                    <b-navbar-item tag="router-link" to="/profile">Profile</b-navbar-item>
                    <b-navbar-item @click="logout">Log out</b-navbar-item>
                </div>
                <div v-else>
                    <b-navbar-item @click="login">Log in</b-navbar-item>
                </div>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script>
export default {
    props: ["pages"],
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        }
    }
};
</script>