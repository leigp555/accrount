<template>
  <div class="statistic-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="inner">
      <div class="transWrap" :class="{incomeOpen:countType==='income',incomeClose:countType==='expenditure'}">
        <div id="incomeChart" >
          <EChart :option="optionIncome" root="incomeChart"></EChart>
        </div>
      </div>
      <div class="transWrap" :class="{expenditureOpen:countType==='expenditure',expenditureClose:countType==='income'}">
        <div id="expenditureChart">
          <EChart :option="optionExpenditure" root="expenditureChart"></EChart>
        </div>
      </div>
    </div>
    <MoneyRanking :data="weekExpenditureData"/>
  </div>

</template>

<script lang="ts" setup>
import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";
import EChart from "./lib/EChart.vue";
import {result} from "./lib/fetchData";
import dayjs from "dayjs";
import {hashType} from "./lib/type";
import {computed, watchEffect} from "vue";
import {useStore} from "vuex";
import {stateObj} from "../vueX/vueX";
import MoneyRanking from "./lib/MoneyRanking.vue";

type weekInformation = {
  zhDay: string,
  orderIndex: string,
  resetWeekDay: number
}
const store = useStore()
const {sortedExpenditure, sortedIncomeList} = result()

const currentTime = Date()
//获取当前时间为一周当中的周几
const currentDay = dayjs(currentTime).day()
//getWeek函数返回距离当前时间的周一和周日的天数
const getWeek = () => {
  const weekHash = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    7: "周日",
  }
  let weekInfo: weekInformation = {}
  for (let key in weekHash) {
    if (key === currentDay.toString()) {
      weekInfo.zhDay = weekHash[key]
      weekInfo.orderIndex = key - 0
    }
    weekInfo.resetWeekDay = 7 - (weekInfo.orderIndex - 0)
  }
  return weekInfo
}
//获取周一和周日的具体时间
const {zhDay, orderIndex, resetWeekDay} = getWeek()
const weekStart = dayjs(currentTime).subtract(orderIndex - 1, 'day')
const weekEnd = dayjs(currentTime).add(resetWeekDay, 'day')
//创建一个key为一周时间的hash对象
const createWeekDayHash = () => {
  const obj = {}
  for (let i = 0; i < 7; i++) {
    obj[dayjs(weekStart).add(i, 'day').format("YYYY-MM-DD")] = []
  }
  return obj
}
//返回符合一周时间内所有记录的具体一天的金额总和以及所有的记录
const handleData = (obj: hashType) => {
  const weekDayHash = createWeekDayHash()
  let xxx= []
  for (let key in weekDayHash) {
    weekDayHash[key] = obj[key] || [0]
  }
  for(let key in weekDayHash){
     if(obj[key]&&obj[key].length===2){
       xxx.push(obj[key][0])
     }else if(obj[key]&&obj[key].length>2){
       const yyy=[...obj[key]]
       yyy.pop()
       xxx=xxx.concat(yyy)
     }
  }
  return [weekDayHash,xxx]
}
//获取当天所有数据
const expenditureWeek = handleData(sortedExpenditure)[0]
const incomeWeek = handleData(sortedIncomeList)[0]
//获取当天的金额总和合成一个数组
const list = (obj) => {
  const array = []
  for (let key in obj) {
    array.push(obj[key][obj[key].length - 1])
  }
  return array
}

const expenditureList = list(expenditureWeek)
const incomeList = list(incomeWeek)

const weekExpenditureData:stateObj[] = handleData(sortedExpenditure)[1].sort((a,b)=>b.countMoney-a.countMoney)
const weekIncomeData:stateObj[] = handleData(sortedIncomeList)[1].sort((a,b)=>b.countMoney-a.countMoney)

//echart选项
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
const createOption = (list) => {
  return {
    toolbox: {
      show: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      feature: {
        magicType: {
          type: ["bar", "line"]
        }
      },
      orient: "horizontal",
      itemSize: 20,
      itemGap: 10,
      showTitle: false,
      right: 25,
      iconStyle: {
        color: "#73c0de"
      }
    },
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },

    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '金额',
        position: 'left',
        alignTicks: true,
        minInterval: 100,
        axisLine: {
          show: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '{value} ',
          margin: -5
        }
      }
    ],
    series: [
      {
        name: '金额',
        type: 'line',
        yAxisIndex: 0,
        data: [...list]
      }
    ]
  };
}
const countType = computed(() => {
  return store.state.countType
})

const optionIncome = createOption(incomeList)
const optionExpenditure = createOption(expenditureList)

</script>

<style lang="scss" scoped>
.statistic-wrap {
  width: 100%;
  height: 100%;
  background-color: white;
  color: white;

  > .countType {
    background-color: #202020;
  }
  >.inner{
    width: 100%;
    padding: 10px;
    >.transWrap{
      transition: all 250ms;
      display: block;
      width: 100%;
    }
    position: relative;

    #incomeChart{
      transform: translateX(100vw);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }

}

#incomeChart, #expenditureChart {
  display: block;
  width: 100%;
  height: 400px;
}
.incomeOpen{
  transform: translateX(-100vw);
}
.expenditureClose{
  transform: translateX(-100vw);
}
</style>