<template>
<div class="detail-wrap">
  <div class="nav"></div>
  <div class="content"></div>
</div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, watchEffect} from "vue";
import {stateObj} from "../vueX/vueX";
import dayjs from "dayjs";

const store=useStore()
store.commit("fetchData")
const allDate=computed(()=>{
  return store.state.fetchDate
})
//收入的全部数据
const incomeList=computed(()=>{
  return allDate.value.filter((item:stateObj)=>item.countType==="income") as stateObj[]
})
//支出的全部数据
const expenditureList=computed(()=>{
  return allDate.value.filter((item:stateObj)=>item.countType==="expenditure")
})

type hashType={[key:string]:stateObj[]}
const ymd=(date:string)=>{return dayjs(date).format("YYYY-MM-DD")}
const sortList=(arr:stateObj[])=>{
  const hash:hashType={}
  arr.forEach((item)=>{
    if(!hash[ymd(item.nodeTime)]){
      hash[ymd(item.nodeTime)]=[item]
    }else if(hash[ymd(item.nodeTime)]){
      hash[ymd(item.nodeTime)].push(item)
    }
  })
  return hash
}
const sortedIncomeList=sortList(incomeList.value)
const sortedExpenditure=sortList(expenditureList.value)
console.log(sortedIncomeList);
console.log(sortedExpenditure);
</script>

<style lang="scss" scoped>

</style>