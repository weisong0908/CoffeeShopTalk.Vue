<template>
    <page title="Chatroom">
        <b-field label="Name">
            <b-input placeholder="your name" v-model="username"></b-input>
        </b-field>
        <b-field label="Message">
            <b-input maxlength="200" type="textarea" v-model="message"></b-input>
        </b-field>
        <div class="buttons">
            <b-button type="is-primary" @click="sendMessage">Send</b-button>
        </div>
        <chat-bubble
            v-for="reply in replies"
            :key="reply.time"
            :profilePicture="$auth.user.picture"
            :content="reply.message"
            :username="reply.user"
            :time="reply.time"
        ></chat-bubble>
    </page>
</template>

<script>
import Page from "../components/Page";
import ChatBubble from "../components/ChatBubble";
import { HubConnectionBuilder } from "../../node_modules/@microsoft/signalr/dist/browser/signalr";

export default {
    components: {
        Page,
        ChatBubble
    },
    data() {
        return {
            connection: {},
            username: "",
            message: "",
            replies: []
        };
    },
    methods: {
        sendMessage() {
            const message = this.message;
            this.connection
                .invoke("SendMessage", this.username, message)
                .catch(err => console.error(err));

            this.message = "";
        }
    },
    mounted() {
        this.connection = new HubConnectionBuilder()
            .withUrl(`${process.env.VUE_APP_CHATHUB}`)
            .build();

        this.connection
            .start()
            .then(() => {
                alert("connection ok");
            })
            .catch(err => {
                alert(err);
            });
        this.connection.on("ReceiveMessage", (user, message) => {
            this.replies.push({
                user: user,
                message: message,
                time: new Date()
            });
        });
    }
};
</script>
