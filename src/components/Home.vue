<template>
  <div class="home-wrap">
    <div class="record-type">
      <RecordType/>
    </div>
    <div class="record-icon">
      <RecordIcon/>
    </div>
    <div class="record-node">
      <RecordNode/>
    </div>
    <div class="record-time">
      <RecordTime/>
    </div>
    <div class="record-calc">
      <RecordCalc/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted} from "vue";
import RecordType from "./RecordType.vue";
import RecordIcon from "./RecordIcon.vue";
import RecordNode from "./RecordNode.vue";
import RecordTime from "./RecordTime.vue";
import RecordCalc from "./RecordCalc.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "Home",
  components: {RecordCalc, RecordTime, RecordNode, RecordIcon, RecordType},
  setup() {
    const store = useStore()
    onBeforeUnmount(() => {
      store.commit("initial")
    })
    onMounted(()=>{
      if(document.body.getBoundingClientRect().width>500){
        window.alert("请使用手机浏览")
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.home-wrap{
  overflow: hidden;
  background-color: #202020;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: end;
  >.record-icon{
    flex-grow: 10;
    flex-shrink: 10;
  }
}
</style>