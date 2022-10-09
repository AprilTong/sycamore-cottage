import { createStore } from 'vuex'
import menus from './module/menu'

interface StoreState {
    count: number
}
const defaultState = {
    count: 0,
}

export default createStore({
    modules: {
        menus
    },
    state() {
        return defaultState
    },
    mutations: {
        increment(state: StoreState) {
            state.count++
        },
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    getters: {
        double(state: StoreState) {
            return 2 * state.count
        }
    }
})
