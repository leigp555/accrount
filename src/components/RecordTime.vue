<template>
  <div class="home-node-wrap">
    <label>
      <span>记账日期：</span>
      <input type="datetime-local" value="2018-06-12T19:30">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "RecordNode"
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