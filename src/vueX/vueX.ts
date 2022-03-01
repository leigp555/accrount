import {createStore} from 'vuex'

export const store = createStore({
    state: () => {
        return {
            countType: "income",
            iconNumber: 0,
            node: "",
            nodeTime: Date,
            countMoney: 0,
            allData:{}
        }
    },
    mutations: {
        modifyCountType(state, payload) {
            state.countType = payload
        },
        modifyIconNumber(state, payload) {
            state.iconNumber = payload
        },
        modifyNode(state, payload) {
            state.node = payload
        },
        modifyNodeTime(state, payload) {
            state.nodeTime = payload
        },
        modifyCountMoney(state, payload) {
            state.countMoney = payload
        },
        getAll(state) {
            state.allData= {
                countType: state.countType,
                iconNumber: state.iconNumber,
                node: state.node,
                nodeTime: state.nodeTime,
                countMoney: state.countMoney
            }
        }
    },
    actions:{
        getAllDate({commit}){
            commit("getAll")
        }
    }
})

