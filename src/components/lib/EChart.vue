<template>
  <div id="ecRoot"></div>
</template>
<script lang="ts">
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {defineComponent, onMounted, toRefs} from "vue";


export default defineComponent({
  props:{
    option:Object
  },
  setup(props) {
    const {option}=toRefs(props)
    echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, BarChart, LabelLayout, UniversalTransition, CanvasRenderer]);
    onMounted(() => {
      const myChart = echarts.init(document.getElementById("ecRoot")!);
      myChart.setOption(option.value)
    })
  }
})
</script>

<style lang="scss" scoped>
#ecRoot{
  width: 100%;
  height: 100%;
}
</style>