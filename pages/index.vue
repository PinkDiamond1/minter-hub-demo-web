<script>
import MntToEth from '~/components/MntToEth.vue';
import EthToMnt from '~/components/EthToMnt.vue';

export default {
    components: {
        MntToEth,
        EthToMnt,
    },
}
</script>

<template>
    <div class="u-section u-container">
        <div class="u-grid u-grid--vertical-margin">
            <div class="u-cell u-cell--medium--1-2">
                <MntToEth/>
            </div>
            <div class="u-cell u-cell--medium--1-2">
                <EthToMnt/>
            </div>
        </div>
    </div>
</template>

