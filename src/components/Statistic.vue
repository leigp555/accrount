<template>
  <div class="statistic-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="button" @click="change">
      <button id="statisticFist" @click="toggle('week')">按周</button>
      <button @click="toggle('month')">按月</button>
      <button @click="toggle('year')">按年</button>
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
      <MoneyRanking :data="expenditureShowData" :dataType="type"/>
    </div>
    <div class="rank">
      <MoneyRanking :data="incomeShowData" v-if="countType==='income'" :dataType="type"/>
    </div>
  </div>

</template>

<script lang="ts" setup>

import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";
import EChart from "./lib/EChart.vue";
import {result} from "./lib/fetchData";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import MoneyRanking from "./lib/MoneyRanking.vue";
import {useStore} from "vuex";
import dayjs from "dayjs";
import {handleDataX} from "./lib/statistic";

const store = useStore()
const first = ref<HTMLDivElement>()
//store中获取金额类型
const countType = computed(() => {
  return store.state.countType
})
//获取store中的所有数据
const {sortedIncomeList, sortedExpenditure} = result()
//获取当前时间
const currentTime = dayjs()

const year = (count: number) => {
  return dayjs().subtract(count, 'year').format("YYYY")
}
const createDateX = (type: string) => {
  if (type === "week") {
    return ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
  } else if (type === "month") {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  } else if (type === "year") {
    return [year(2), year(1), year(0)]
  }
}

//echart选项

const createOption = (axisX: string[], axisY: number[]) => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {show: true, type: ['line', 'bar']},
      },
      orient: "horizontal",
      itemGap: 10,
      showTitle: false,
      right: 15,
    },

    calculable: true,
    grid: {
      show: false,
      left: "15%",
      right: "8%",
      bottom: "30px",
    },
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: axisX,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#d3c8c8"
          }
        },
        axisTick: {
          show: false
        }
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: "#d3c8c8"
          }
        }
      }
    ],
    color:"yellow",
    series: [
      {
        name: '金额',
        type: 'bar',
        data: [...axisY],

        markPoint: {
          data: [
            {type: 'max', name: 'Max'},
            {type: 'min', name: 'Min'}
          ]
        },
      },
    ]
  };


}
//根据不同统计类型方会相应的数据
const type = ref<"year" | "month" | "week">("week")
const outer = computed(() => {
  return handleDataX(type.value, sortedIncomeList, sortedExpenditure, currentTime)!
})

const expenditureShowData = computed(() => {
  return outer.value.expenditureShowData
})
const incomeShowData = computed(() => {
  return outer.value.incomeShowData
})
const expenditureList = computed(() => {
  return outer.value.expenditureList
})
const incomeList = computed(() => {
  return outer.value.incomeList
})
const toggle = (countType: "year" | "month" | "week") => {
  type.value = countType
}


//创建支付和收入的图表选项
const optionIncome = computed(() => {
  return createOption(createDateX(type.value)!, incomeList.value as number[])
})
const optionExpenditure = computed(() => {
  return createOption(createDateX(type.value)!, expenditureList.value as number[])
})
const lastEl = ref<HTMLDivElement>()
onMounted(() => {
  //@ts-ignore
  lastEl.value = document.getElementById("statisticFist")
  lastEl.value!.classList.add("first")
})
const change = (e: Event) => {
  lastEl.value && lastEl.value!.classList.remove("first")
  const el = e.target as HTMLDivElement
  if (el.tagName.toLowerCase() === "button") {
    el.classList.add("first")
  }
  lastEl.value = el
}
//组件消亡时初始化组件
onBeforeUnmount(() => {
  store.commit("initial")
})
</script>

<style lang="scss" scoped>
.statistic-wrap {
  overflow: hidden;
  height: 100%;
  background-color: inherit;
  color: white;

  > .countType {
    background-color: #202020;
    padding-top: 20px;
  }

  > .button {
    color: white;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    align-items: center;
    gap: 20px;

    > .first {
      color: yellow;
    }

    > button {
      background-color: inherit;
      border: none;

      &:focus {
        color: yellow;
      }
    }
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