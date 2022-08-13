<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-date-picker
      class="form-item-date-picker"
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

  import type { AnyPropName }  from "@types";

  import { useChange } from "./useFormItem";
  import { formItemDefaultProps } from "./const";

  interface FormItemEmits {
    (e: "update:modelValue", value: any): void,
    (e: "onChange", value: any, key: string): void,
  }

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemProps {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: [Record<string, unknown>], // 校验规则 同antd 表单校验规则一致
    props?: AnyPropName, // 组件额外 props 同antd组件props一致
    change?: (value: any, key: string) => void, // 当前项值变化时触发
  }
  
  const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const dateValue = ref(props.modelValue);
  const dateFormat = ref();
  const dateValueFormat = ref();

  onBeforeMount(() => {
    setDateFormat();
  })

  watch(dateValue, value => {
    useChange(emits, props, value);
  })

  watch(() => props.modelValue, value => {
    dateValue.value = value;
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
      "week": "YYYY-ww[周]",
    }

    const formatValueMap: DateType = {
      ...formatMap,
      "quarter": "YYYY-MM:YYYY-[Q]Q",
      "week": "YYYY-MM-DD:YYYY-ww[周]"
    }

    const showTimeFormat = dateProps?.showTime?.format;
    const dateDefaultFormat = `YYYY-MM-DD${showTimeFormat ? ` ${showTimeFormat}` : ""}`; // 未设置picker 默认选择日期时

    // 如需自定义值的格式请自行更改 formatValueMap 或者直接在props.props中定义 {valueFormat: "YYYY-MM-DD" or your format}
    dateFormat.value = formatMap[dateProps?.picker] || dateDefaultFormat;
    dateValueFormat.value = formatValueMap[dateProps?.picker] || dateDefaultFormat;
  }
</script>

<style lang="less" scoped>
  .form-item-date-picker{
    width: 100%;
  }
</style>