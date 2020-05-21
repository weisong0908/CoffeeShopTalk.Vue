<template>
    <div>
        <h1>Chatroom</h1>
        <b-field label="Name">
            <b-input placeholder="your name" v-model="username"></b-input>
        </b-field>
        <b-field label="Message">
            <b-input
                maxlength="200"
                type="textarea"
                v-model="message"
            ></b-input>
        </b-field>
        <div class="buttons">
            <b-button type="is-primary" @click="sendMessage">Send</b-button>
        </div>
        <ul>
            <li v-for="reply in replies" :key="reply.time">
                <em>[{{ reply.time }}]</em> <b>{{ reply.user }}</b
                >: {{ reply.message }}
            </li>
        </ul>
    </div>
</template>

<script>
import { HubConnectionBuilder } from "../../node_modules/@microsoft/signalr/dist/browser/signalr";

export default {
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
                .catch((err) => console.error(err));

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
            .catch((err) => {
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
