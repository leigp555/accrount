<template>
  <Tabs v-model:selected="selected">
    <Tab title="收入">收入</Tab>
    <Tab title="支出">支出</Tab>
  </Tabs>
</template>

<script lang="ts" setup>
import Tab from "./lib/Tab.vue"
import Tabs from "./lib/Tabs.vue"
import {ref} from "vue";
const selected=ref("收入")
</script>