<template>
  <div class="home-node-wrap">
    <div class="inner">
      <label>
        <span>备注：</span>
        <input type="text" placeholder="点击备注..." v-model="node" @change="commit">
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {expenditureNode, incomeNode} from "./lib/iconNode";

export default defineComponent({
  name: "RecordNode",
  setup(){
    const store=useStore()
    const recordNode=computed(()=>{
      return store.state.node
    })
    const node=ref<string>("")
    const commit=()=>{
      store.commit("modifyNode",node.value)
    }
    watchEffect(()=>{
      if(!recordNode.value)node.value=""
    })
    const iconNodeX=computed(()=>{
      if(store.state.countType==="expenditure"&&expenditureNode[store.state.iconNumber]){
         return expenditureNode[store.state.iconNumber]
      }else if(store.state.countType==="income"&&incomeNode[store.state.iconNumber]){
        return incomeNode[store.state.iconNumber]
      }
    })
    watchEffect(()=>{
      store.commit("modifyIconNode",iconNodeX.value)
    })
    return {node,commit}
  }
})
</script>

<style lang="scss" scoped>
.home-node-wrap{
  display: flex;
  justify-content: start;
  align-items: center;
  background-color:#2a2a2a;
  border-top: 1px solid #202020;
  >.inner{
    color: white;
    padding: 10px;
    display: inline-flex;
    align-items: center;
    >label{
      >input{
        border: none;
        background-color: inherit;
      }
    }
  }
}

</style>