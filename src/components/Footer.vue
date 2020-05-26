<template>
    <footer class="footer">
        <p class="title is-4">
            Coffee Shop Talk
            <small class="has-text-grey">&nbsp; {{ appVersion }}</small>
        </p>
        <p class="subtitle is-6">
            A project by
            <a
                href="https://tengweisong.com"
                target="_blank"
                rel="noopener noreferrer"
            >Teng Wei Song</a>
        </p>
        <hr />
        <div class="columns">
            <div class="column is-one-third">
                <p class="title is-4">What is this project?</p>
                <p>
                    <strong>Coffee Shop Talk</strong> is a simple real-time text-based chat application. The client- and server-side components are developed separately to ensure loosely coupled architecture.
                </p>
                <br />
                <p>
                    This project makes use of
                    <strong>Github Actions</strong> to achieve CICD (continous integrtion and continous deployment), allowing latest developemnt to be deployed to server immediately.
                </p>
                <br />
            </div>
            <div class="column is-one-third">
                <p class="title is-4">Technology stack</p>
                <p class="title is-6">Vue 2.6</p>
                <p>Vue helps building the frontend as a single page application.</p>
                <div class="buttons">
                    <b-button
                        tag="a"
                        size="is-small"
                        href="https://github.com/weisong0908/CoffeeShopTalk.Vue"
                        target="_blank"
                        icon-left="github-circle"
                    >Frontend repository</b-button>
                </div>
                <p class="title is-6">ASP.NET Core 3.1</p>
                <p>Web APIs and SignalR are used to make real-time communication possible, thanks to the .NET Core technology.</p>
                <div class="buttons">
                    <b-button
                        tag="a"
                        size="is-small"
                        href="https://github.com/weisong0908/CoffeeShopTalk.WebApi"
                        target="_blank"
                        icon-left="github-circle"
                    >Backend repository</b-button>
                </div>
            </div>
            <div class="column is-one-third">
                <p class="title is-4">Attributes</p>
                <p>
                    Several icons used in this application are made by
                    <a
                        href="https://smashicons.com/"
                        title="Smashicons"
                    >Smashicons</a> from
                    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </p>
            </div>
        </div>
        <p class="has-text-right">&copy; {{ currentYear }} Teng Wei Song. All rights reserved.</p>
    </footer>
</template>

<script>
import { version } from "../../package.json";

export default {
    data() {
        return {
            appVersion: version,
            currentYear: new Date().getFullYear()
        };
    }
};
</script>