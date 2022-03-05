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
        <div id="incomeChart">
          <EChart :option="optionIncome" root="incomeChart"></EChart>
        </div>
      </div>
      <div class="transWrap" :class="{expenditureOpen:countType==='expenditure',expenditureClose:countType==='income'}">
        <div id="expenditureChart">
          <EChart :option="optionExpenditure" root="expenditureChart"></EChart>
        </div>
      </div>
    </div>
    <div class="rank" v-if="countType==='expenditure'">
      <MoneyRanking :data="expenditureShowData"/>
    </div>
    <div class="rank">
      <MoneyRanking :data="incomeShowData" v-if="countType==='income'"/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";
import EChart from "./lib/EChart.vue";
import {result} from "./lib/fetchData";
import {computed, ref} from "vue";

import MoneyRanking from "./lib/MoneyRanking.vue";
import {useStore} from "vuex";
import dayjs from "dayjs";
import {handleDataX} from "./lib/statistic";
const store=useStore()
const {sortedIncomeList, sortedExpenditure} = result()
const currentTime=dayjs()
const type=ref<"year"|"month"|"week">("week")
const countType = computed(() => {
  return store.state.countType
})
type.value="month"
const {expenditureShowData, incomeShowData, expenditureList, incomeList} =handleDataX("year",sortedIncomeList, sortedExpenditure,currentTime)!

const year=(count:number)=>{
  return dayjs().subtract(count, 'year').format("YYYY")
}

const createDateX=(type:string)=>{
  if(type==="week"){
    return  ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
  }else if(type==="month"){
    return  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  }else if(type==="year"){
    return [year(2),year(1),year(0)]
  }
}
//echart选项
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
const createOption = (axisX:string[],axisY:number[]) => {
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
        data:axisX
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
        data: [...axisY]
      }
    ]
  };
}


const optionIncome = createOption(createDateX("year")!,incomeList as number[])
const optionExpenditure = createOption(createDateX("year")!,expenditureList as number[])

</script>

<style lang="scss" scoped>
.statistic-wrap {
  width: 100%;
  height: 100%;
  background-color: inherit;
  color: white;

  > .countType {
    background-color: #202020;
  }

  > .inner {
    width: 100%;
    padding: 10px;
    background-color: #2a2a2a;

    > .transWrap {
      transition: all 250ms;
      display: block;
      width: 100%;
    }

    position: relative;

    #incomeChart {
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
  height: 300px;
}

.incomeOpen {
  transform: translateX(-100vw);
}

.expenditureClose {
  transform: translateX(-100vw);
}
</style>