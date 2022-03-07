import {createStore} from 'vuex'
import dayjs from "dayjs";
export type stateObj = {
    countType: string,
    iconNumber: string,
    node: string,
    nodeTime: string,
    countMoney: number,
}

export const store = createStore({
    state: () => {
        return {
            countType: "expenditure",
            iconNumber: "",
            node: "",
            nodeTime: "",
            countMoney: 0,
            allData: {},
            fetchDate: [],
            iconNode: ""
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
            state.allData = {
                countType: state.countType,
                iconNumber: state.iconNumber,
                node: state.node,
                nodeTime: state.nodeTime,
                countMoney: state.countMoney
            }
        },
        fetchData(state) {
            state.fetchDate = JSON.parse(window.localStorage.getItem("save-record")!) || []
        },
        initial(state) {
            state.countType = "expenditure"
            state.iconNumber = ""
            state.node = ""
            state.nodeTime = dayjs().format('YYYY-MM-DDTHH:mm:ss')
            state.countMoney = 0
            state.fetchDate = []
            state.allData = {}
        },
        modifyIconNode(state, payload) {
            state.iconNode = payload
        },
    },
    actions: {
        getAllDate(ctx) {
            ctx.commit("getAll")
        },
        saveData({commit, state}) {
            commit("fetchData")
            // @ts-ignore
            state.fetchDate.push(state.allData as stateObj)
            const string = JSON.stringify(state.fetchDate)
            window.localStorage.setItem("save-record", string)
        },
        getNode({commit, state}) {
            if (state.node === "") {
                commit("modifyNode", state.iconNode)
                commit("modifyIconNode", "")
            }
        }
    }


})

