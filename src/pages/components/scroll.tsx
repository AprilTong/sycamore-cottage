import { defineComponent, h } from 'vue'

export default defineComponent({
    setup() {
        const testFn = () => {
            console.log('1231232')
            return <div>april</div>
        }
        return {
            testFn
        }
    },

    render() {
        return (
            <>
                <div class="wrap">
                    <el-scrollbar height="1400px">
                        <div>{h(<></>, {}, this.testFn())}</div>
                        <div>12313</div>
                    </el-scrollbar>
                </div>
            </>
        )
    }
})
