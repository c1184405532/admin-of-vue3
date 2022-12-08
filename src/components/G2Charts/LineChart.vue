<template>
  <div class="line-chart-container" ref="chartRef"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from "vue";
  import { Line } from "@antv/g2plot";
  import type { Options, Line as LineInstance } from "@antv/g2plot";

  interface PropsType {
    options: Options
  }

  const chartRef = ref();
  const chartInstance = ref<LineInstance>();
  const props = withDefaults(defineProps<PropsType>(), {});

  watch(props.options, n => {
    if (chartInstance.value) chartInstance.value.update(n); // 必须在dom生成后才能更新, 假设onMounted未执行时options已经改变了也无需更新, 最后会在onMounted中进行初始化。
  })

  onMounted(() => {
    initChart();
  })

  function initChart() {
    chartInstance.value = new Line(chartRef.value, props.options);
    chartInstance.value.render();
  }
  
  defineExpose({ chartInstance: chartInstance.value }); // 暴露实例方法 用于自定义使用 https://g2plot.antv.antgroup.com/api/plot-api

</script>

<style lang="less" scoped>
  // .line-chart-container{}
</style>