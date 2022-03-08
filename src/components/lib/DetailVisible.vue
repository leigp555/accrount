<template>
  <div class="list-wrap">
    <div class="back">
      <router-link to="detail">
        <svg class="icon xx" aria-hidden="true">
          <use xlink:href="#icon-back"></use>
        </svg>
      </router-link>
    </div>
    <div class="top">
      <div class="inner">
        <span class="type">{{ itemInfo?.type }}</span>
        <span class="money">￥{{ selectedItem.countMoney }}</span>
      </div>
    </div>
    <div class="contentType">{{ itemInfo?.contentType }}</div>
    <div class="nav">
      {{ dayjs(selectedItem.nodeTime).format("YYYY-MM-DD") }}<span>支出￥{{ selectedItem.countMoney }}</span></div>
    <div class="content">
      <div class="left">
        <div class="svgWrap">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${selectedItem.iconNumber}`"></use>
          </svg>
        </div>
        <input type="text" v-model="modifyNode" id="nodeX" autocomplete="no" class="addBorder">
      </div>
      <div class="right">
        <label>
          <span>￥</span>
          <input type="text" v-model.number="modifyMoney" id="moneyX" autocomplete="no" class="addBorder">
        </label>
        <span>{{ dayjs(selectedItem.nodeTime).format("HH:mm") }}</span>
      </div>
    </div>
    <div class="buttonWrap">
      <button class="buttonX"  @click="save">保存编辑</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {stateObj} from "../../vueX/vueX";
import {expenditureNode, incomeNode} from "./iconNode";
import dayjs from "dayjs";
import {router} from "../../route/router";

const route = useRoute()
const store = useStore()
const query = route.query
store.commit("fetchData")
const fetchData = computed(() => {
  return store.state.fetchDate as stateObj[]
})
const selectedItem = fetchData.value.filter((item) => {
  if (item.nodeTime === query.q) {
    return item
  }
})[0]
const itemInfo = computed(() => {
  if (selectedItem.countType === "expenditure") {
    //@ts-ignore
    return {title: expenditureNode[selectedItem.iconNumber], type: "支出", contentType: "支出明细"}
  } else if (selectedItem.countType === "income") {
    //@ts-ignore
    return {title: incomeNode[selectedItem.iconNumber], type: "收入", contentType: "收入明细"}
  }
})
const modifyNode = ref(selectedItem.node)
const modifyMoney = ref(selectedItem.countMoney)
const save = () => {
  const modifiedItem = Object.assign(selectedItem) as stateObj
  modifiedItem.countMoney = modifyMoney.value
  modifiedItem.node = modifyNode.value
  const newData = Object.assign(fetchData)
  const index = newData.value.indexOf(selectedItem)
  newData.value.splice(index, 1, modifiedItem)
  store.commit("saveData", newData.value)
  window.alert("修改成功")
  router.push('/detail')
}
</script>

<style lang="scss" scoped>
.list-wrap {
  color: white;
  padding-top: 20px;

  > .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 30px;

    > .inner {
      display: flex;
      flex-direction: column;
      gap: 10px;

      > span:nth-child(2) {
        font-size: 24px;
      }
    }
  }

  > .contentType {
    padding: 10px 20px;
    font-size: 18px;
  }
  >.nav{
    font-size: 16px;
  }
  > .content {
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

        > .icon {
          width: 40px;
          height: 40px;
          background-color: white;
          clip-path: circle(50%);
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
      }

      > input {
        background-color: inherit;
        border: none;
        color: white;
        max-width: 100px;
        padding: 0 10px;
        line-height: 40px;

        &:focus {
          color: yellow;
        }

        &.addBorder {
          color: yellow;
        }
      }
    }

    .right {
      display: inline-flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: start;
      text-align: right;
      gap: 8px;

      > label {
        > input {
          display: inline;
          max-width: 50px;
          background-color: inherit;
          border: none;
          color: white;
          line-height: 30px;

          &:focus {
            color: yellow;
          }

          &.addBorder {
            color: yellow;
          }

        }
      }
    }
  }

  > .nav {
    font-size: 10px;
    padding: 15px 20px;
    background-color: #2a2a2a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > .buttonWrap {
    display: inline-block;
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 80px;

    > button {
      background-color: yellow;
      color: black;
      border: none;
      padding: 8px 15px;
      border-radius: 10px;
      position: absolute;
      white-space: nowrap;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  > .back {
    display: inline-block;
    margin-left: 20px;

    > a > .icon {
      width: 25px;
      height: 25px;
      color: white;
      background-color: inherit;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>