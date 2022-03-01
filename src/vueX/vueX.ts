import { createStore } from 'vuex'

export const store = createStore({
    state:()=> {
        return {
            countType:"income"
        }
    },
    mutations: {
        modifyCountType (state,payload) {
            state.countType=payload
        }
    }
})

