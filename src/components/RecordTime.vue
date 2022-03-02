<template>
  <div class="home-node-wrap">
    <label>
      <span>记账日期：</span>
      <input type="datetime-local"  v-model="time">
    </label>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import dayjs from "dayjs";
export default defineComponent({
  name: "RecordNode",
  setup(){
    const store=useStore()
    const currentTime=computed(()=>{
     return dayjs().format('YYYY-MM-DDTHH:mm:ss')
    })
    const time=ref<string>(currentTime.value)
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