<template>
    <footer class="footer">
        <p class="title is-4">
            Coffee Shop Talk
            <small class="has-text-grey">&nbsp; {{ appVersion }}</small>
        </p>
        <p class="subtitle is-6">A project by Teng Wei Song</p>
        <div class="columns">
            <div class="column is-one-third">
                <p>This is a simple real-time chat application</p>
                <br />
                <b-taglist attached>
                    <b-tag type="is-black" size="is-medium">
                        <a
                            href="https://github.com/weisong0908/CoffeeShopTalk.Vue"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <b-icon type="is-light" icon="github-circle"></b-icon>
                        </a>
                    </b-tag>
                    <b-tag type="is-dark" size="is-medium">Github repository</b-tag>
                </b-taglist>
                <b-taglist attached>
                    <b-tag type="is-black" size="is-medium">
                        <a href="https://tengweisong.com" target="_blank" rel="noopener noreferrer">
                            <b-icon type="is-light" icon="wordpress"></b-icon>
                        </a>
                    </b-tag>
                    <b-tag type="is-dark" size="is-medium">Personal blog</b-tag>
                </b-taglist>
            </div>
            <div class="column is-one-third">
                <p class="subtitle is-6">Developed with:</p>
                <p>
                    <strong>ASP.NET Core 3.1</strong>
                </p>
                <small>Web APIs and SignalR are used to make real-time communication possible, thanks to the .NET Core technology.</small>
                <br />
                <br />
                <p>
                    <strong>Vue 2.6</strong>
                </p>
                <small>Vue helps building the frontend as a single page application.</small>
            </div>
            <div class="column is-one-third">
                <p class="subtitle is-6">Attributes</p>
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