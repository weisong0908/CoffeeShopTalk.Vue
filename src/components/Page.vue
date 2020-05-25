<template>
    <section class="section">
        <b-message title="warining" type="is-warning">This page is under development</b-message>
        <div class="tile is-vertical is-ancestor">
            <div class="tile is-parent">
                <div class="tile is-child">
                    <p class="title">{{ title }}</p>
                    <p class="subtitle">{{ subtitle }}</p>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String
    }
};
</script>