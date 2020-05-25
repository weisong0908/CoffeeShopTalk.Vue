<template>
    <page title="Chatroom">
        <section class="hero is-light">
            <div class="hero-head">
                <div class="container">
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="is-size-7">Message count</p>
                                <p class="is-size-7">{{ replies.length }}</p>
                            </div>
                        </div>
                        <div class="level-item">
                            <b-button
                                size="is-small"
                                @click="scrollToBottom"
                                icon-left="arrow-down"
                            >Scroll to bottom</b-button>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="hero-body" :style="chatsWindowStyle" ref="chatsWindow">
                <chat-bubble
                    v-for="reply in replies"
                    :key="replies.indexOf(reply)"
                    :profilePicture="$auth.user.picture"
                    :content="reply.message"
                    :username="reply.user"
                    :time="reply.time"
                ></chat-bubble>
            </div>
            <div class="hero-foot"></div>
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
            replies: [],
            chatsWindowStyle: {
                height: "500px",
                "overflow-y": "auto"
            }
        };
    },
    methods: {
        sendMessage(content) {
            this.connection
                .invoke("SendMessage", this.$auth.user.nickname, content)
                .catch(err => console.error(err));
        },
        scrollToBottom() {
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
                this.$buefy.toast.open({
                    message: "Connected",
                    type: "is-success"
                });
            })
            .catch(err => {
                this.$buefy.toast.open({
                    message: "Connextion failed",
                    type: "is-danger"
                });

                console.error(err);
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
        this.scrollToBottom();
    }
};
</script>
