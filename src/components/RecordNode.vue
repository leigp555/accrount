<template>
<div class="home-node-wrap">
  <label>
    <span>备注：</span>
    <input type="text" placeholder="备注一下吧...">
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