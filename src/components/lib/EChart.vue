<template>
  <div id="ecRoot"></div>
</template>
<script lang="ts">
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { ToolboxComponent } from 'echarts/components';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {defineComponent, onMounted, toRefs, watchEffect} from "vue";
export default defineComponent({
  props:{
    option:Object,
    root:String
  },
  setup(props) {
    const {option,root}=toRefs(props)
    echarts.use([TitleComponent,TooltipComponent,
      GridComponent, DatasetComponent, TransformComponent,
      BarChart, LineChart, LabelLayout, UniversalTransition,
      CanvasRenderer,ToolboxComponent
    ]);
    onMounted(() => {
      const myChart = echarts.init(document.getElementById(root.value!)!);
      watchEffect(()=>{
        option.value&&myChart.setOption(option.value)
      })
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