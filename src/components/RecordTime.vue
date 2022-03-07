<template>
  <div class="home-node-wrap">
    <div class="inner">
      <label>
        <span>记账日期：</span>
        <input type="datetime-local"  v-model="time">
      </label>
    </div>
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
  background-color:#2a2a2a;
  padding: 5px 0;
  color: white;
  >.inner{
    display: inline-flex;
    padding: 10px;
    align-items: center;
    >label{
      >input{
        border: none;
        background-color: inherit;
        color: white;
      }
    }
  }
}

</style>