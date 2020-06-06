<template>
    <page title="Profile">
        <div v-if="$auth.isAuthenticated">
            <div class="columns">
                <div class="column is-one-third">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img :src="$auth.user.picture" alt="profile picture" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img
                                            style="max-width:100%;max-height:100%;"
                                            :src="$auth.user.picture"
                                            alt="small profile picture"
                                        />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">@{{ $auth.user.name }}</p>
                                    <p class="subtitle is-6">{{ $auth.user.email }}</p>
                                </div>
                            </div>
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a
                                class="card-footer-item"
                                @click="isProfileEditModalShown = true"
                            >Edit profile</a>
                        </footer>
                    </div>
                </div>
                <div class="column is-one-third">
                    <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
                </div>
            </div>

            <b-modal :active.sync="isProfileEditModalShown" @close="resetChanges">
                <div class="modal-card-head">
                    <p class="modal-card-title">Edit profile</p>
                </div>
                <div class="modal-card-body">
                    <b-field label="Username">
                        <b-input v-model="username" icon="account"></b-input>
                    </b-field>
                    <div class="box">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-128x128">
                                    <img
                                        style="max-width: 100%;max-height: 100%;"
                                        :src="profilePicturePreview"
                                        alt="profile picture"
                                    />
                                </figure>
                            </div>
                            <button
                                class="delete is-small"
                                type="button"
                                @click="deleteNewProfilePicture()"
                            ></button>
                        </div>
                    </div>
                    <b-field class="file">
                        <b-upload v-model="newProfilePicture" @input="profilePictureUploaded">
                            <a class="button is-primary">
                                <b-icon icon="upload"></b-icon>
                                <span>Upload new profile picture</span>
                            </a>
                        </b-upload>
                        <span
                            class="file-name"
                            v-if="newProfilePicture"
                        >{{ newProfilePicture.name }}</span>
                    </b-field>
                </div>
                <div class="modal-card-foot">
                    <b-button @click="submitChanges">Submit</b-button>
                    <b-button @click="resetChanges" type="is-danger">Reset</b-button>
                </div>
            </b-modal>
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
            isProfileEditModalShown: false,
            username: "",
            newProfilePicture: null,
            profilePicturePreview: ""
        };
    },
    mounted() {
        this.username = this.$auth.user.name;
        this.profilePicturePreview = this.$auth.user.picture;
    },
    methods: {
        profilePictureUploaded(file) {
            var reader = new FileReader();
            reader.onload = e => {
                this.profilePicturePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        deleteNewProfilePicture() {
            this.newProfilePicture = null;
            this.profilePicturePreview = this.$auth.user.picture;
        },
        async submitChanges() {
            const token = await this.$auth.getTokenSilently();

            const formData = new FormData();
            formData.append("userId", this.$auth.user.sub);
            formData.append("username", this.username);
            if (this.newProfilePicture) {
                formData.append("profilePicture", this.newProfilePicture);
            }

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
                .then(resp => {
                    console.log("resp", resp);
                    this.$router.go(this.$route.path);
                });
        },
        resetChanges() {
            this.isProfileEditModalShown = false;
            this.newProfilePicture = null;
            this.username = this.$auth.user.name;
            this.profilePicturePreview = this.$auth.user.picture;
        }
    }
};
</script>