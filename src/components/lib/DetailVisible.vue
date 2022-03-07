<template>
<div class="list-wrap">
  <div class="title">{{itemInfo.title}}</div>
  <div class="type">{{itemInfo.type}}</div>
  <div class="money">￥{{selectedItem.countMoney}}</div>
  <div class="contentType">{{itemInfo.contentType}}</div>
  <div class="nav">{{dayjs(selectedItem.nodeTime).format("YYYY-MM-DD")}}<span>支出￥{{ selectedItem.countMoney}}</span></div>
  <div class="content">
      <div class="left">
        <div class="svgWrap">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${selectedItem.iconNumber}`"></use>
          </svg>
        </div>
        <p>{{ selectedItem.node }}</p>
      </div>
      <div class="right">
        <p>￥{{ selectedItem.countMoney }}</p>
        <span>{{ dayjs(selectedItem.nodeTime).format("HH:mm") }}</span>
      </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";
import {stateObj} from "../../vueX/vueX";
import {expenditureNode, incomeNode} from "./iconNode";
import dayjs from "dayjs";

const route=useRoute()
const store=useStore()
const query=route.query
store.commit("fetchData")
const fetchData=computed(()=>{
  return store.state.fetchDate as stateObj[]
})
const selectedItem=fetchData.value.filter((item)=>{if(item.nodeTime===query.q){
         return item
}})[0]
const itemInfo=computed(()=>{
  if(selectedItem.countType==="expenditure"){
    return {title:expenditureNode[selectedItem.iconNumber],type:"支出",contentType:"支出明细"}
  }else if(selectedItem.countType==="income"){
    return {title:incomeNode[selectedItem.iconNumber],type:"收入",contentType: "收入明细"}
  }
})
</script>

<style lang="scss" scoped>
.list-wrap{
  color: white;
  >.content {

    background-color: #202020;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .left {
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
  >.nav {
    font-size: 10px;
    padding: 15px 20px;
    background-color: #2a2a2a;
    display: flex;
    justify-content: space-between;
    align-items: center;
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