<template>
  <div class="line-chart-container" id="line-chart-container"></div>
</template>

<script lang="ts" setup>
  import { Line } from "@antv/g2plot";
  import { onMounted } from "vue";
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
    { year: "1999", value: 8 },
  ];

  

  onMounted(() => {
    initChart();
  })

  function initChart() {
    const line = new Line("line-chart-container", {
      data,
      padding: "auto",
      xField: "year",
      yField: "value"
    });

    line.render();
  }
  

</script>

<style lang="less" scoped>
  .line-chart-container{
    height: 500px;
    width: 800px;
  }
</style>