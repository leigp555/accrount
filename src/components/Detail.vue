<template>
  <div class="detail-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="content-wrap">
      <div class="expenditure" :class="{'exOpen':countType==='expenditure','exClose':countType!=='expenditure'}">
        <div  v-for="(value,key) in sortedExpenditure"
             :key="key" >
          <div class="nav">{{ key }}</div>
          <div class="content" v-for="(item,index) in value"
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
              <p>￥{{ item.countMoney }}</p>
              <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
            </div>
          </div>
        </div>
      </div>


     <div class="income" :class="{'inOpen':countType==='income','inClose':countType!=='income' }">
       <div v-for="(value,key) in sortedIncomeList"
            :key="key" >
         <div class="nav">{{ key }}</div>
         <div class="content" v-for="(item,index) in value"
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
             <p>￥{{ item.countMoney }}</p>
             <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
           </div>
         </div>
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
const countType = computed(() => {
  return store.state.countType
})
</script>

<style lang="scss" scoped>
.detail-wrap {
  > .content-wrap {
    position: relative;
    >.expenditure,.income{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: all 250ms;
    }
    >.income{
      transform: translateX(50vw);
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

      .right {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: column;
        text-align: right;
        gap: 8px;

        p {
          font-size: 20px;
        }
      }

    }
    >.exOpen{
      transform: translateX(0);
    }
    >.exClose{
      transform: translateX(-100vw);
    }
    >.inOpen{
      transform: translateX(0);
    }
    >.inClose{
      transform: translateX(100vw);
    }
  }

  > .exOpen {
    border: 1px solid red;
  }

  > .countType {
    background-color: #202020;
  }

  color: white;
  margin-bottom: 50px;

  .nav {
    padding: 10px;
    background-color: #2a2a2a;
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