<template>
  <div class="statistic-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="inner">
      <div id="main">
        <EChart :option="option"></EChart>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";
import EChart from "./lib/EChart.vue";
import {result} from "./lib/fetchData";
import dayjs from "dayjs";

type weekInformation = {
  zhDay: string,
  orderIndex: string,
  resetWeekDay:number
}
const {sortedExpenditure, sortedIncomeList} = result()
console.log(sortedExpenditure)
console.log(sortedIncomeList);

const currentTime=Date()
const currentDay = dayjs(currentTime).day()
const getWeek=()=>{
  const weekHash = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    7: "周日",
  }
  let weekInfo:weekInformation = {}
  for (let key in weekHash) {
    if (key === currentDay.toString()) {
      weekInfo.zhDay = weekHash[key]
      weekInfo.orderIndex = key-0
    }
     weekInfo.resetWeekDay = 7 - (weekInfo.orderIndex - 0)
  }
  return weekInfo
}
const {zhDay,orderIndex,resetWeekDay}=getWeek()
console.log(zhDay, orderIndex, resetWeekDay);
const x=dayjs(currentTime).subtract(orderIndex-1, 'day')
const y=dayjs(currentTime).add(resetWeekDay, 'day')
console.log(x.format("YYYY-MM-DD"))
console.log(y.format("YYYY-MM-DD"));
console.log(dayjs(currentTime).format("YYYY-MM-DD"));

// const option: ECOption = {
//   toolbox: {
//     show: true,
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'cross'
//       }
//     },
//     feature: {
//       magicType: {
//         type: ["bar", "line"]
//       },
//       restore: {},
//     },
//     orient: "horizontal",
//     itemSize: 18,
//     itemGap: 10,
//     showTitle: false,
//     right:15,
//     iconStyle: {
//       color: "rgb(135,208,93)"
//     }
//   },
//   xAxis: {
//     type: 'category',
//     data: ['周一', '周一', '周一', '周一', '周一', '周一', '周一'],
//     axisTick: {
//       show: false
//     },
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name:"xxx",
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: 'line'
//     }
//   ]
// };
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
const option = {
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
      width: '100%',
      name: '温度',
      position: 'center',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 0,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};
</script>

<style lang="scss" scoped>
.statistic-wrap {
  height: 100%;
  background-color: white;
  color: red;

  > .countType {
    background-color: #202020;
  }
}

#main {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
</style>