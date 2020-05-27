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
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="is-size-7">Connection</p>
                                <b-icon
                                    type="is-success"
                                    icon="check-circle"
                                    size="is-small"
                                    v-if="isConnected"
                                ></b-icon>
                                <b-icon type="is-danger" icon="close-circle" size="is-small" v-else></b-icon>
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
                    :content="reply.content"
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
            isConnected: false,
            replies: [],
            chatsWindowStyle: {
                height: "500px",
                "overflow-y": "auto"
            }
        };
    },
    methods: {
        sendMessage(content) {
            const message = {
                sender: this.$auth.user.nickname,
                recipient: "someone",
                content: content
            };

            this.connection.invoke("SendMessage", message).catch(err => {
                this.$buefy.toast.open({
                    message: "Message is not sent",
                    type: "is-danger"
                });

                console.error(err);
            });
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
            .withUrl(`${process.env.VUE_APP_CHATHUB}`, {
                accessTokenFactory: () => this.$auth.getTokenSilently()
            })
            .build();

        this.connection
            .start()
            .then(() => {
                this.$buefy.toast.open({
                    message: "Connected",
                    type: "is-success"
                });
                this.isConnected = true;
            })
            .catch(err => {
                this.$buefy.toast.open({
                    message: "Connection failed",
                    type: "is-danger"
                });
                this.isConnected = false;
                console.error(err);
            });

        this.connection.on("ReceiveMessage", message => {
            this.replies.push({
                user: message.sender,
                content: message.content,
                time: new Date(Date.parse(message.time))
            });
        });
    },
    updated() {
        this.scrollToBottom();
    }
};
</script>
