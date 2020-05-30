<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="profilePicture" alt="profile picture" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <strong>{{ username }}</strong>
                <br />
                <small style="white-space:nowrap">{{ description }}</small>
                <br />
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <b-icon type="is-success" icon="power-plug" size="is-small"></b-icon>
                            <small>online</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        profilePicture: {
            type: String,
            default: require("../assets/user.png")
        },
        username: {
            type: String,
            default: "user"
        },
        description: {
            type: String,
            default: "I am available"
        }
    }
};
</script>