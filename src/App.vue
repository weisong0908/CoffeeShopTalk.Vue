<template>
    <div id="app">
        <router-link to="/">Home</router-link>
        <router-link to="/chatroom">Chatroom</router-link>
        <router-link v-if="$auth.isAuthenticated" to="/profile">Profile</router-link>
        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {}
};
</script>
