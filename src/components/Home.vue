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
import {defineComponent} from "vue";
import RecordType from "./RecordType.vue";
import RecordIcon from "./RecordIcon.vue";
import RecordNode from "./RecordNode.vue";
import RecordTime from "./RecordTime.vue";
import RecordCalc from "./RecordCalc.vue";

export default defineComponent({
  name: "Home",
  components: {RecordCalc, RecordTime, RecordNode, RecordIcon, RecordType}
})
</script>

<style lang="scss" scoped>

</style>