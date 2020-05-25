<template>
    <page title="Coffee Shop Talk">
        <b-button type="is-primary" tag="router-link" to="/chatroom">Go to chat</b-button>

        <div v-if="!$auth.loading">
            <b-button v-if="!$auth.isAuthenticated" @click="login">Log in</b-button>
            <b-button v-if="$auth.isAuthenticated" @click="logout">Log out</b-button>
        </div>
    </page>
</template>

<script>
import Page from "../components/Page";

export default {
    components: { Page },
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
