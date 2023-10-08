<script lang="tsx">
import { onBeforeMount, h, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      let { fullPath } = route
      const { query } = route
      fullPath = fullPath.replace('/redirect', '')
      router.replace({ path: fullPath, query })
    })
  },
  render() {
    return ''
    // return h(<></>, {}, <div></div>)
  }
})
</script>
