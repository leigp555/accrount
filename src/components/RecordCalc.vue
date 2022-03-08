<template>
  <div class="home-recordTime-wrap">
    <div class="showMoney">
      <div class="money">￥{{ result ? result : 0 }}</div>
    </div>
    <div class="money-calc">
      <div @click="onClick" class="inputPad">
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>-</button>
        <button>0</button>
        <button>1</button>
        <button>2</button>
        <button>+</button>
        <button>.</button>
        <button>清除</button>
        <button class="complete">完成</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {calc} from "./lib/calc";
import {useStore} from "vuex";

export default defineComponent({
  name: "RecordCalc",
  setup() {
    const store = useStore()
    const result = ref<string>("")
    const onClick = (e: Event) => {
      //@ts-ignore
      const text = e.target!.innerText as string
      try {
        calc(result, text)
      } catch (error) {
        alert("error")
      }
      if (text === "完成") {
        store.dispatch("getNode")
        const resultNumber = parseInt(result.value)
        store.commit("modifyCountMoney", resultNumber)
        store.dispatch("getAllDate")
        if (store.state.allData.iconNumber) {
          // console.log(store.state.node)
          store.dispatch("saveData")
          // console.log(store.state.node)
          store.commit("initial")
          result.value = ""
          window.alert("记录成功")
        } else {
          window.alert("请选择一个图标")
        }

      }
    }
    return {onClick, result}
  }
})
</script>

<style lang="scss" scoped>
.home-recordTime-wrap {
  background-color: #efbd5e;
  padding-top: 10px;
  > .showMoney {

    padding: 14px;
    margin: 0 15px;
    background-color: #fdefd2;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .5);
    border-radius: 10px;
    >.money{
      text-align: right;
    }
  }

  > .money-calc {
    margin: 10px 15px 0;

    .inputPad {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      > button {
        margin-bottom: 10px;
        font-size: 18px;
        padding: 10px 0;
        text-align: center;
        width: 23%;
        border: 1px solid #999;
        background-color: #fdefd2;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .5);
        border-radius: 10px;
      }

      > .complete {
        width: 46%;
      }
    }
  }
}
</style>