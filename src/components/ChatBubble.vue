<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="profilePicture" alt="profile picture" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <small>
                    <strong>{{ username }}</strong>
                    &nbsp;
                    {{ time.toTimeString() }}
                </small>
                <p>{{ content }}</p>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        profilePicture: String,
        username: String,
        time: Date,
        content: String
    }
};
</script>