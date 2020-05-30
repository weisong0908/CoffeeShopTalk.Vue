<template>
    <page title="Profile">
        <div v-if="$auth.isAuthenticated">
            <img :src="$auth.user.picture" alt="profile picture" />
            <p>user name: {{ $auth.user.name }}</p>
            <p>user email: {{ $auth.user.email }}</p>
            <p>roles: {{ $auth.user["https://coffee-shop-talk-stg/roles"] }}</p>
            <div>
                <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
            </div>
        </div>
    </page>
</template>

<script>
import Page from "../components/Page";

export default {
    components: { Page }
};
</script>