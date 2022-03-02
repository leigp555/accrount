<template>
  <div class="detail-wrap">
    <div class="countType">
      <Tabs >
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="expenditure" v-for="(value,key,index) in sortedExpenditure"
         :key="index">
      <div class="nav">{{ key }}</div>
      <div class="content" v-for="(item,index) in quickSoft(value)"
           :key="index">
        <div class="left">
          <div class="svgWrap">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${item.iconNumber}`"></use>
            </svg>
          </div>
          <p>{{ item.node }}</p>
        </div>
        <div class="right">
          <p>{{ item.countMoney }}</p>
          <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
        </div>
      </div>
    </div>


    <hr>
    <div class="income" v-for="(value,key,index) in sortedIncomeList"
         :key="index">
      <div class="nav">{{ key }}</div>
      <div class="content" v-for="(item,index) in quickSoft(value)"
           :key="index">
        <div class="left">
          <div class="svgWrap">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${item.iconNumber}`"></use>
            </svg>
          </div>
          <p>{{ item.node }}</p>
        </div>
        <div class="right">
          <p>{{ item.countMoney }}</p>
          <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tab from "./lib/Tab.vue";
import Tabs from "./lib/Tabs.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import {stateObj} from "../vueX/vueX";
import dayjs from "dayjs";

const store = useStore()
store.commit("fetchData")
const allDate = computed(() => {
  return store.state.fetchDate
})

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
      left.push(number[i])
    } else {
      right.push(number[i])
    }
  }
  return quickSoft(left).concat([pivot], quickSoft(right))
}


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

type hashType = { [key: string]: stateObj[] }
const ymd = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD")
}

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
const sortedIncomeList = sortList(incomeList.value)
const sortedExpenditure = sortList(expenditureList.value)
//是否展示
</script>

<style lang="scss" scoped>
.detail-wrap {
  >.countType{
    background-color: #202020;
  }
  color: white;
  margin-bottom: 50px;
  .nav {
    padding: 10px;
    background-color: #2a2a2a;
  }

  .content {
    background-color: #202020;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      > .svgWrap {
        display: inline-block;
        padding: 10px;
        background-color: #342f2c;
        border-radius: 35%;
      }
    }
    .right{
      display: inline-flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 10px;
    }

  }
}

.icon {
  width: 40px;
  height: 40px;
  background-color: white;
  clip-path: circle(50%);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>