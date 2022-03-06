<template>
  <div class="typeComponent">
    <Tabs >
      <Tab title="支出"></Tab>
      <Tab title="收入"></Tab>
    </Tabs>
  </div>
</template>


<script lang="ts" setup>
import Tab from "./lib/Tab.vue"
import Tabs from "./lib/Tabs.vue"
</script>

<style lang="scss" scoped>
.typeComponent {
  padding-top: 15px;
  background-color:  #202020;
  color: #df9853;
}
</style>