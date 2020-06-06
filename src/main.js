import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { domain, clientId, audience } from "../configs/auth_config.json";
import { Auth0Plugin } from "./auth";
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Buefy);

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
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

Sentry.init({
    dsn: 'https://d4475b6019f04f2ba5d85d6cd93beeee@o383638.ingest.sentry.io/5266833',
    integrations: [new VueIntegration({ Vue, attachProps: true })],
});
