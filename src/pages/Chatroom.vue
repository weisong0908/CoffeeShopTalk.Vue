<template>
    <page title="Chatroom">
        <section class="hero is-light">
            <div
                class="hero-body"
                style="height:400px;overflow-y:auto;"
                ref="chatsWindow"
                id="chatsWindow"
            >
                <chat-bubble
                    v-for="reply in replies"
                    :key="replies.indexOf(reply)"
                    :profilePicture="$auth.user.picture"
                    :content="reply.message"
                    :username="reply.user"
                    :time="reply.time"
                ></chat-bubble>
            </div>
        </section>
        <section class="section">
            <chat-input @sendMessage="sendMessage"></chat-input>
        </section>
    </page>
</template>

<script>
import Page from "../components/Page";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { HubConnectionBuilder } from "../../node_modules/@microsoft/signalr/dist/browser/signalr";

export default {
    components: {
        Page,
        ChatBubble,
        ChatInput
    },
    data() {
        return {
            connection: {},
            replies: []
        };
    },
    methods: {
        sendMessage(content) {
            this.connection
                .invoke("SendMessage", this.$auth.user.nickname, content)
                .catch(err => console.error(err));
        },
        scroll() {
            this.$refs.chatsWindow.scrollTo({
                top: this.$refs.chatsWindow.scrollHeight,
                behavior: "smooth"
            });
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
    },
    updated() {
        this.scroll();
    }
};
</script>
