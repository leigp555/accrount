<template>
  <div class="statistic-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";

</script>

<style lang="scss" scoped>
.statistic-wrap {
  height: 100%;
  background-color: white;
  color: red;
  >.countType {
    background-color: #202020;
  }
}
</style>