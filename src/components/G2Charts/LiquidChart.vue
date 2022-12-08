<template>
  <div class="liquid-chart-container" ref="chartRef"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from "vue";
  import { Liquid } from "@antv/g2plot";
  import type { LiquidOptions, Liquid as LiquidInstance } from "@antv/g2plot";

  interface PropsType {
    options: LiquidOptions
  }

  const chartRef = ref();
  const chartInstance = ref<LiquidInstance>();
  const props = withDefaults(defineProps<PropsType>(), {});

  watch(props.options, n => {
    if (chartInstance.value) chartInstance.value.update(n); // 必须在dom生成后才能更新, 假设onMounted未执行时options已经改变了也无需更新, 最后会在onMounted中进行初始化。
  })

  onMounted(() => {
    initChart();
  })

  function initChart() {
    chartInstance.value = new Liquid(chartRef.value, props.options);
    chartInstance.value.render();
  }
  
  defineExpose({ chartInstance: chartInstance.value }); // 暴露实例方法 用于自定义使用 https://g2plot.antv.antgroup.com/api/plot-api

</script>

<style lang="less" scoped>

</style>