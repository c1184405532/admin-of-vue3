<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-input-number
      class="form-item-input-number"
      v-model:value="inputValue"
      v-bind="props.props"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/input-number-cn#API

  import { ref, watch } from "vue";
  import { formItemDefaultProps } from "./const";

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemPropsType {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: [Record<string, unknown>], // 校验规则 同antd 表单校验规则一致
    change?: (value: any, key: string) => void, // 当前项值变化时触发
    props?: object, // 组件额外 props 同antd组件props一致
  }
  
  const emits = defineEmits(["update:modelValue"]);
  const props = withDefaults(defineProps<FormItemPropsType>(), {...formItemDefaultProps});

  const inputValue = ref(props.modelValue);

  watch(inputValue, (newv) => {
    emits("update:modelValue", newv);
    // todo 待写change 改变
    console.log(props.change);
    
  })

  watch(() => props.modelValue, (newv) => {
    inputValue.value = newv;
  })
</script>

<style lang="less">
  .form-item-input-number{
    width: 100%;
  }
</style>