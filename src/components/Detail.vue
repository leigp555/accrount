<template>
<div class="detail-wrap">
  <div class="nav"></div>
  <div class="content"></div>
</div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, watchEffect} from "vue";

const store=useStore()
store.commit("fetchData")
const allDate=computed(()=>{
  return store.state.fetchDate
})

//{"countType": "expenditure","iconNumber": "icon1","node": "ok","nodeTime": "2022-03-02T18:55:54","countMoney": 78}

</script>

<style lang="scss" scoped>

</style>