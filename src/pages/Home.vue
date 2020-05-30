<template>
    <page title="Coffee Shop Talk">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <b-button @click="getWeather">Get weather</b-button>
        <p>{{ weather }}</p>
    </page>
</template>

<script>
import Page from "../components/Page";
import axios from "axios";

export default {
    components: { Page },
    data() {
        return {
            weather: ""
        };
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        },
        async getWeather() {
            const token = await this.$auth.getTokenSilently();

            const { data } = await axios.get(
                `${process.env.VUE_APP_WEBAPI}/WeatherForecast`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            this.weather = data;
        }
    }
};
</script>
