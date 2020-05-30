<template>
    <page title="Admin dashboard">
        <p class="title is-5">Connected users</p>
        <b-table narrowed :data="connectedUsers.data" :columns="connectedUsers.columns"></b-table>
    </page>
</template>

<script>
import Page from "../components/Page";
import axios from "axios";

export default {
    components: {
        Page
    },
    data() {
        return {
            connectedUsers: {
                data: [],
                columns: []
            }
        };
    },
    created() {
        this.getConnectedUsers();
    },
    methods: {
        async getConnectedUsers() {
            const token = await this.$auth.getTokenSilently();

            const { data } = await axios.get(
                `${process.env.VUE_APP_WEBAPI}/chatmanager/connectedUsers/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            this.connectedUsers.data = data;

            this.connectedUsers.columns = [
                {
                    field: "userId",
                    label: "User ID"
                },
                {
                    field: "username",
                    label: "Username"
                },
                {
                    field: "connection.connectionId",
                    label: "Connection ID"
                },
                {
                    field: "connection.userAgent",
                    label: "User agent"
                },
                {
                    field: "connection.isConnected",
                    label: "Connection status"
                }
            ];
        }
    }
};
</script>