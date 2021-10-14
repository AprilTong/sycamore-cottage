<template>
    <h2>{{ text }}</h2>
</template>
<script lang="ts">
    import { reactive, defineComponent, toRefs } from 'vue'
    export default defineComponent({
        setup() {
            const state = reactive({
                text: 'april',
            })
            return {
                ...toRefs(state),
            }
        },
    })
</script>
