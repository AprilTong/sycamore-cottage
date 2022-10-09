<script lang="tsx">
import { onBeforeMount, h, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'redirect',
    setup() {
        const route = useRoute()
        const router = useRouter()
        onBeforeMount(() => {
            let { fullPath, query } = route
            fullPath = fullPath.replace('/redirect', '')
            router.replace({ path: fullPath, query })
        })
    },
    render() {
        return h(<></>, {}, <div></div>)
    }
})
</script>
