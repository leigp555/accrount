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
import {defineComponent, onBeforeUnmount} from "vue";
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
  }
})
</script>

<style lang="scss" scoped>
.home-wrap{
  background-color: #202020;
}
</style>