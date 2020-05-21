import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Buefy);

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

new Vue({
    render: (h) => h(App),
    router
}).$mount("#app");
