<template>
  <div class="typeComponent">
    <Tabs v-model:selected="selected">
      <Tab title="支出"></Tab>
      <Tab title="收入"></Tab>
    </Tabs>
  </div>
</template>


<script lang="ts" setup>
import {useStore} from "vuex";

const store = useStore()
import Tab from "./lib/Tab.vue"
import Tabs from "./lib/Tabs.vue"
import {ref, watchEffect} from "vue";

const selected = ref("支出")
watchEffect(() => {
  if (selected.value === "收入") {
    store.commit("modifyCountType", "income")
  } else if (selected.value === "支出") {
    store.commit("modifyCountType", "expenditure")
  }
})
</script>

<style lang="scss" scoped>
.typeComponent {
  padding-top: 10px;
  background-color: #ccc076;
}
</style>