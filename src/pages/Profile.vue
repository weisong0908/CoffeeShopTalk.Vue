<template>
    <page title="Profile">
        <div v-if="$auth.isAuthenticated">
            <section>
                <b-field>
                    <div class="image is-64x64">
                        <img :src="$auth.user.picture" alt="profile picture" />
                        <p>current</p>
                    </div>
                    <div class="image is-64x64" v-if="profilePicture">
                        <img :src="preview" alt="profile picture" />
                        <p>new</p>
                    </div>
                </b-field>
                <b-field class="file">
                    <b-upload v-model="profilePicture" @input="profilePictureUploaded">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload new profile picture</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="profilePicture">{{ profilePicture.name }}</span>
                </b-field>
                <b-field label="Username">
                    <b-input v-model="username" icon="account"></b-input>
                </b-field>

                <b-button @click="submitChanges">Submit</b-button>
            </section>

            <img :src="$auth.user.picture" alt="profile picture" />
            <p>user name: {{ username }}</p>
            <p>user email: {{ $auth.user.email }}</p>
            <p>roles: {{ $auth.user["https://coffee-shop-talk-stg/roles"] }}</p>
            <div>
                <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
            </div>
        </div>
    </page>
</template>

<script>
import Page from "../components/Page";
import axios from "axios";

export default {
    components: { Page },
    data() {
        return {
            username: "",
            profilePicture: null,
            preview: ""
        };
    },
    mounted() {
        this.username = this.$auth.user.name;
    },
    methods: {
        profilePictureUploaded(file) {
            var reader = new FileReader();
            reader.onload = e => {
                this.preview = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        async submitChanges() {
            const token = await this.$auth.getTokenSilently();

            const formData = new FormData();
            formData.append("userId", this.$auth.user.sub);
            formData.append("username", this.username);
            formData.append("profilePicture", this.profilePicture);

            axios
                .patch(
                    process.env.VUE_APP_WEBAPI + "/userprofile/update/",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                .then(data => {
                    console.log("username patched", data);
                });
        }
    }
};
</script>