<template>
  <div class="home-recordTime-wrap">
    <div class="showMoney">
      <div class="money">{{ result?result:0 }}</div>
    </div>
    <div class="money-calc">
      <div @click="onClick" class="inputPad">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>3</button>
        <button>4</button>
        <button>+</button>
        <button>1</button>
        <button>2</button>
        <button>.</button>
        <button>0</button>
        <button>清除</button>
        <button>完成</button>
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
    const store=useStore()
    const result=ref<string>("")
    const onClick=(e:Event)=>{
      //@ts-ignore
      const text=e.target!.innerText as string
      try {
        calc(result,text)
      }catch (error){
        alert("error")
      }
     if(text==="完成"){
       const resultNumber=parseInt(result.value)
       store.commit("modifyCountMoney",resultNumber)
       store.dispatch("getAllDate")
       if(store.state.allData.iconNumber){
         store.dispatch("saveData")
         store.commit("initial")
         result.value=""
         window.alert("记录成功")
       }else {
         window.alert("请选择一个图标")
       }

     }
    }
    return {onClick,result}
  }
})
</script>

<style lang="scss" scoped>
.home-recordTime-wrap {
  border: 1px solid #999;
  margin-top: 10px;
  margin-bottom: 6em;
  height: 100%;

  > .showMoney {
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 14px;
    border: 1px solid black;
  }

  > .money-calc {
    .inputPad {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      > button {
        flex-grow: 1;
        font-size: 18px;
        padding: 15px 0;
        text-align: center;
        width: 25vw;
        border: 1px solid #999;
      }
    }
  }
}
</style>