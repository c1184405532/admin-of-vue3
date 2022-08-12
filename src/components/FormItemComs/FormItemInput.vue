<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-input
      v-model:value="inputValue"
      v-bind="props.props"
    ></a-input>
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/input-cn/#API
  import { ref, watch, defineEmits } from "vue";

  import { useChange } from "./useForm";
  import { formItemDefaultProps } from "./const";

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemProps {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: [Record<string, unknown>], // 校验规则 同antd 表单校验规则一致
    change?: (value: any, key: string) => void, // 当前项值变化时触发
    props?: object, // 组件额外 props 同antd组件props一致
  }
  
  const emits = defineEmits(["update:modelValue", "onChange"]);
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const inputValue = ref(props.modelValue);

  watch(inputValue, value => {
    // const { change, name } = props;
    console.log(props)
    useChange(emits, props, value);
    // emits("update:modelValue", value); // v-model响应
    // emits("change", value, name); // formSearch事件响应
    // change(value, name); // 数据项中传入的事件响应

  })

  watch(() => props.modelValue, value => {
    inputValue.value = value;
  })
</script>