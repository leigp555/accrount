<template>
  <div class="statistic-wrap">
    <div class="countType">
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="inner">
    <div id="main">
      <EChart :option="option"></EChart>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabs from "./lib/Tabs.vue";
import Tab from "./lib/Tab.vue";
import {ECOption} from "./lib/type";
import EChart from "./lib/EChart.vue";
const option: ECOption = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
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
#main{
  width: 200px;
  height: 200px;
}
</style>