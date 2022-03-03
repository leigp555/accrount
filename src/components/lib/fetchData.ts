import {useStore} from "vuex";
import {computed} from "vue";
import {stateObj} from "../../vueX/vueX";
import dayjs from "dayjs";


//排序
const quickSoft: (number: stateObj[]) => stateObj[] = (number: stateObj[]) => {
    if (number.length <= 1) {
        return number
    }
    const index = Math.floor(number.length / 2)
    const pivot = number.splice(index, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < number.length; i++) {
        if (dayjs(number[i].nodeTime).isBefore(pivot.nodeTime)) {
            right.push(number[i])
        } else {
            left.push(number[i])
        }
    }
    return quickSoft(left).concat([pivot], quickSoft(right))
}
interface hashType {
    [key: string]: stateObj[],
}
const ymd = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD")
}
//加一个total属性
const total = (obj: hashType) => {
    const newObj = Object.assign(obj)
    for (let key in newObj) {
        const arr = newObj[key] as stateObj[]
        if (arr.length === 1) {
            //@ts-ignore
            arr.push(arr[0].countMoney)
        } else {
            let number = 0
            arr.forEach((item) => {
                number += item.countMoney
            })
            //@ts-ignore
            arr.push(number)
        }
    }
    return newObj
}


export const result = () => {
    const store = useStore()
    store.commit("fetchData")
    const allDate = computed(() => {
        return store.state.fetchDate
    })
    //收入的全部数据
    const incomeList = computed(() => {
        let arr = allDate.value.filter((item: stateObj) => item.countType === "income") as stateObj[]
        return quickSoft(arr)
    })
    //支出的全部数据
    const expenditureList = computed(() => {
        let arr = allDate.value.filter((item: stateObj) => item.countType === "expenditure")
        return quickSoft(arr)
    })
    //根据时间数据分组
    const sortList = (arr: stateObj[]) => {
        const hash: hashType = {}
        arr.forEach((item) => {
            if (!hash[ymd(item.nodeTime)]) {
                hash[ymd(item.nodeTime)] = [item]
            } else if (hash[ymd(item.nodeTime)]) {
                hash[ymd(item.nodeTime)].push(item)
            }
        })
        return hash
    }
    let sortedIncomeList = sortList(incomeList.value)
    let sortedExpenditure = sortList(expenditureList.value)

    sortedExpenditure = total(sortedExpenditure)
    sortedIncomeList = total(sortedIncomeList)
    return {sortedExpenditure,sortedIncomeList}
}

