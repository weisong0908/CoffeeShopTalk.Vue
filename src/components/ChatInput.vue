<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="$auth.user.picture" alt="profile picture" />
            </p>
        </figure>
        <div class="media-content">
            <b-field>
                <b-input
                    maxlength="200"
                    type="textarea"
                    v-model="content"
                    placeholder="Tyoe your message here..."
                ></b-input>
            </b-field>
            <nav class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <div class="level-item">
                        <b-button type="is-primary" @click="sendMessage">Send</b-button>
                    </div>
                </div>
            </nav>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            content: ""
        };
    },
    methods: {
        sendMessage() {
            this.$emit("sendMessage", this.content);
            this.content = "";
        }
    }
};
</script>