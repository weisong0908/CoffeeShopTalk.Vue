<template>
    <page title="Chatroom">
        <b-button @click="stopConnection">Stop connection</b-button>
        <div class="columns">
            <div class="column is-one-fifth">
                <div class="hero is-light">
                    <connected-user
                        v-for="user in connectedUsers"
                        :profilePicture="user.profilePicture"
                        :username="user.username"
                        :description="user.description"
                        :isConnected="user.connection.isConnected"
                        :key="user.userId"
                    ></connected-user>
                </div>
            </div>
            <div class="column">
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
                                        <b-icon
                                            type="is-danger"
                                            icon="close-circle"
                                            size="is-small"
                                            v-else
                                        ></b-icon>
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
                            :username="reply.sender"
                            :time="reply.time"
                        ></chat-bubble>
                    </div>
                    <div class="hero-foot"></div>
                </section>
                <section class="section">
                    <chat-input @sendMessage="sendMessage"></chat-input>
                </section>
            </div>
        </div>
    </page>
</template>

<script>
import Page from "../components/Page";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import ConnectedUser from "../components/ConnectedUser";
import { HubConnectionBuilder } from "../../node_modules/@microsoft/signalr/dist/browser/signalr";

export default {
    components: {
        Page,
        ChatBubble,
        ChatInput,
        ConnectedUser
    },
    data() {
        return {
            connection: {},
            isConnected: false,
            replies: [],
            chatsWindowStyle: {
                height: "500px",
                "overflow-y": "auto"
            },
            connectedUsers: []
        };
    },
    methods: {
        sendMessage(content) {
            const message = {
                senderId: this.$auth.user.sub,
                sender: this.$auth.user.nickname,
                recipientId: this.$auth.user.sub,
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
        },
        stopConnection() {
            this.connection.stop();
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

        this.connection.on("ReceiveMessage", (message, connectionId) => {
            this.replies.push({
                sender: message.sender,
                content: message.content,
                time: new Date(Date.parse(message.time))
            });
            console.log("connection id", connectionId);
        });

        this.connection.on("OnConnected", connectedUsers => {
            this.connectedUsers = connectedUsers;
        });

        this.connection.on("OnDisconnected", (connectedUsers, exception) => {
            this.connectedUsers = connectedUsers;
            if (exception) console.warn("disconnected", exception);
        });
    },
    updated() {
        this.scrollToBottom();
    },
    beforeDestroy() {
        this.stopConnection();
    }
};
</script>
