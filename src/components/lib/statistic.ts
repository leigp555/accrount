import {stateObj} from "../../vueX/vueX";
import {hashType} from "./type";
import dayjs, {Dayjs} from "dayjs";

type dateType = "week" | "month" | "year"

export const handleDataX = (type: dateType, sortedIncomeList: hashType, sortedExpenditure: hashType, currentTime: Dayjs) => {
    const createAxisHash = (type: dateType, startDay: Dayjs) => {
        if (type === "week") {
            const dayHash: hashType = {}
            const allDay = 7
            for (let i = 0; i < allDay; i++) {
                dayHash[dayjs(startDay).add(i, 'day').format("YYYY-MM-DD")] = []
            }
            return dayHash
        } else if (type === "month") {
            const dayHash: hashType = {}
            const allDay = 12
            for (let i = 0; i < allDay; i++) {
                dayHash[dayjs(startDay).add(i, 'month').format("YYYY-MM-DD")] = []
            }
            return dayHash
        } else if (type === 'year') {
            const dayHash: hashType = {}
            const allDay: number = 3
            for (let i = 0; i < allDay; i++) {
                dayHash[dayjs(startDay).add(i, 'year').format("YYYY-MM-DD")] = []
            }
            return dayHash
        }
    }   //创建横轴hash表

    const getData = (type: dateType, axisHash: hashType, obj: hashType) => {
        if (type === "week") {
            for (let key in axisHash) {
                axisHash[key] = obj[key] || [0]
            }
            return axisHash
        } else if (type === "month") {
            for (let key in axisHash) {
                for (let x in obj) {
                    if (key.split("-")[0] === x.split("-")[0] && key.split("-")[1] === x.split("-")[1]) {
                        //@ts-ignore
                        if (obj[x] && obj[x].length === 2) {
                            axisHash[key].push(obj[x][0])
                        } else if (obj[x] && obj[x].length > 2) {
                            const arr = obj[x].slice(0, obj[x].length - 1)
                            axisHash[key] = axisHash[key].concat(arr)
                        }
                    }
                }
            }
            return axisHash
        } else if (type === "year") {
            for (let key in axisHash) {
                for (let x in obj) {
                    if (key.split("-")[0] === x.split("-")[0]) {
                        //@ts-ignore
                        if (obj[x] && obj[x].length === 2) {
                            axisHash[key].push(obj[x][0])
                        } else if (obj[x] && obj[x].length > 2) {
                            const arr = obj[x].slice(0, obj[x].length - 1)
                            axisHash[key] = axisHash[key].concat(arr)
                        }
                    }
                }
            }
            return axisHash
        }
    }

    const getTotal = (obj: hashType, arr: number[]) => {
        for (let key in obj) {
            if (obj[key].length === 0) {
                arr.push(0)
            } else if (obj[key].length === 1) {
                arr.push(obj[key][0].countMoney)
            } else if (obj[key].length > 1) {
                let number: number = 0
                obj[key].forEach((item) => {
                    number += item.countMoney
                })
                arr.push(number)
            }
        }
        return arr
    }
    const selected=(obj:hashType|{[key:string]:[0]})=>{
        const hash:hashType|{[key:string]:[0]}={}
        for(let key in obj){
            if(obj[key][0]!==0&&obj[key][0]!==undefined){
                hash[key]=obj[key]
            }
        }
        return hash
    }
    const modifyData=(obj:hashType)=>{
        for(let key in obj){
            if(obj[key].length===1){
                // @ts-ignore
                obj[key].push(obj[key][0].countMoney)
            }else if(obj[key].length>1){
                let number:number=0
                obj[key].forEach((item)=>{
                    number+=item.countMoney
                })
                // @ts-ignore
                obj[key].push(number)
            }
        }
        return obj
    }
    if (type === "week") {
        const getD = (currentTime: Dayjs) => dayjs(currentTime).day() === 0 ? 7 : dayjs(currentTime).day()
        const orderIndex = getD(currentTime)
        const weekStart = dayjs(currentTime).subtract(orderIndex - 1, 'day')
        ////获取weekAxis
        const expenditureData = getData("week", createAxisHash("week", weekStart)!, sortedExpenditure)
        const incomeData = getData("week", createAxisHash("week", weekStart)!, sortedIncomeList)
        const incomeList = [] as number[]
        const expenditureList = [] as number[]
        for (let key in expenditureData!) {
            // @ts-ignore
            expenditureList.push(expenditureData![key][(expenditureData![key].length - 1)])
        }
        for (let key in incomeData!) {
            // @ts-ignore
            incomeList.push(incomeData![key][(incomeData![key].length - 1)])
        }
        const expenditureShowData = selected(expenditureData!)
        const incomeShowData = selected(incomeData!)
        const total = (arr: number[]) => {
            let number = 0
            arr.forEach(item => number += item)
            return number
        }
        const incomeTotal=total(incomeList)
        const expenditureTotal=total(expenditureList)
        return {expenditureShowData, incomeShowData, expenditureList, incomeList,expenditureTotal,incomeTotal}
    } else if (type === "month") {
        // @ts-ignore
        const orderIndex = dayjs(currentTime).format("M") - 0
        const monthStart = dayjs(currentTime).subtract(orderIndex - 1, 'month')
        ////获取weekAxis
        const expenditureData = getData("month", createAxisHash("month", monthStart)!, sortedExpenditure)
        const incomeData = getData("month", createAxisHash("month", monthStart)!, sortedIncomeList)
        const incomeList = getTotal(incomeData!, [])
        const expenditureList = getTotal(expenditureData!, [])
        const expenditureShowData = modifyData( selected(expenditureData!) as hashType)
        const incomeShowData = modifyData( selected(incomeData!) as hashType)
        return {expenditureShowData, incomeShowData, expenditureList, incomeList}
    } else if (type === "year") {
        // @ts-ignore
        const orderIndex = 1
        const yearStart = dayjs(currentTime).subtract(orderIndex + 1, 'year')
        const expenditureData = getData("year", createAxisHash("year", yearStart)!, sortedExpenditure)
        const incomeData = getData("year", createAxisHash("year", yearStart)!, sortedIncomeList)
        const incomeList = getTotal(incomeData!, [])
        const expenditureList = getTotal(expenditureData!, [])
        const expenditureShowData = modifyData( selected(expenditureData!) as hashType)
        const incomeShowData = modifyData( selected(incomeData!) as hashType)
        return {expenditureShowData, incomeShowData, expenditureList, incomeList}
    }
}
