<script>

    import Header from '~/layouts/_header.vue';
    import Snackbar from '~/components/common/Snackbar.vue';

    export default {
        components: {
            Header,
            Snackbar,
        },
        data() {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
    };
</script>

<template>
    <div class="main-wrap">
        <Header title="HUB web interface"/>

        <nuxt class="main-content"/>

        <Snackbar/>
    </div>
</template>

