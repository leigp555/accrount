<template>
  <div class="home-node-wrap">
    <label>
      <span>记账日期：</span>
      <input type="datetime-local"  v-model="time">
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
    const time=ref<Date>("2022-03-26T11:25")
    watchEffect(()=>{
      store.commit("modifyNodeTime",time)
    })
    return {time}
  }
})
</script>

<style lang="scss" scoped>
.home-node-wrap{
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