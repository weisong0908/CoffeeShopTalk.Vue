<template>
    <div v-if="$auth.isAuthenticated">
        <img src="$auth.user.picture" alt="profile picture" />
        <p>user name: {{ $auth.user.name }}</p>
        <p>user email: {{ $auth.user.email }}</p>
        <div>
            <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
        </div>
    </div>
</template>

<script>
export default {};
</script>