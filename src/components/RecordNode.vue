<template>
<div class="home-node-wrap">
  <label>
    <span>备注：</span>
    <input type="text" placeholder="备注一下吧..." v-model="node" @change="commit">
  </label>
</div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";

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
    return {node,commit}
  }
})
</script>

<style lang="scss" scoped>
.home-node-wrap{
  margin-top: 20px;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  >label{
    >input{
      border: none;
    }
  }
}
</style>