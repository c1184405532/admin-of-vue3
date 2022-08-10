<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-range-picker
      class="form-item-date-range-picker"
      v-model:value="dateValue"
      :format="dateFormat"
      :valueFormat="dateValueFormat"
      v-bind="props.props"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/date-picker-cn#API
  // dayjs格式化 https://day.js.org/docs/zh-CN/display/format
  // format 显示的文本格式; valueFormat 实际值的格式

  import { ref, watch, onBeforeMount } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules", "options"]);

  const dateValue = ref(props.modelValue);
  const dateFormat = ref();
  const dateValueFormat = ref();

  onBeforeMount(() => {
    setDateFormat();
  })

  watch(dateValue, (newv) => {
    emits("update:modelValue", newv);
  })

  watch(() => props.modelValue, (newv) => {
    dateValue.value = newv;
  })

  const setDateFormat = () => {
    const dateProps = props.props;

    interface DateType {
      year: string;
      quarter: string;
      month: string;
      week: string;
      [key: string]: string;
    }

    const formatMap: DateType = {
      "year": "YYYY",
      "quarter": "YYYY-[Q]Q",
      "month": "YYYY-MM",
      "week": "YYYY-ww[周]"
    }

    const formatValueMap: DateType = {
      ...formatMap,
      "quarter": "YYYY-MM:YYYY-[Q]Q",
      "week": "YYYY-MM-DD:YYYY-ww[周]"
    }

    const showTimeFormat = dateProps?.showTime?.format;
    const dateDefaultFormat = `YYYY-MM-DD${showTimeFormat ? ` ${showTimeFormat}` : ""}`; // 未设置picker 默认选择日期时

    // 如需自定义值的格式请自行更改 formatValueMap 或者直接在props.props中定义 {valueFormat: "YYYY-MM-DD" or your format}
    dateFormat.value = formatMap[dateProps.picker] || dateDefaultFormat;
    dateValueFormat.value = formatValueMap[dateProps.picker] || dateDefaultFormat;
  }
</script>

<style lang="less" scoped>
  .form-item-date-range-picker{
    width: 100%;
  }
</style>