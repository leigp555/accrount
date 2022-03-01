<template>
<div class="home-node-wrap">
  <label>
    <span>备注：</span>
    <input type="text" placeholder="备注一下吧..." v-model.lazy="node">
  </label>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "RecordNode",
  setup(){
    const store=useStore()
    const node=ref<string>("")
    watchEffect(()=>{
      store.commit("modifyNode",node.value)
    })
    return {node}
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