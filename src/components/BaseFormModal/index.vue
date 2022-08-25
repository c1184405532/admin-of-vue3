<template>
  <a-modal
    v-bind="props"
    v-model:visible="_visible"
    @ok="handleOk"
  >
    <BaseForm
      v-bind="props"
      @change="onChange"
      ref="baseFormRef"
    />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";
  import BaseForm from "@components/BaseForm/index.vue";

  import type { ModalProps } from "ant-design-vue";
  import type { AnyPropName, FormListRowType, BaseFormInstance } from "@types";
  
  import { defaultProps } from "./const";

  interface PropsType extends ModalProps {
    data: Array<FormListRowType>, // 数据源
    modelValue: boolean,
    title?: string, // 弹窗标题
    width?: number,
    loading?: boolean, // 是否加载中
    loadingTip?: string, // 自定义加载提示文案
    delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
    colSpan?: number // 表单项一行占多少列 n/24
    labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
    wrapperCol?: AnyPropName // 表单项 输入控件配置; 类型同 labelCol一致
  }

  interface Emits {
    (e: "update:modelValue", value: boolean): void;
    (e: "formChange", key: string, value: any): void;
    (e: "submit", data: AnyPropName): void;
  }

  const emits = defineEmits<Emits>();
  const props =  withDefaults(defineProps<PropsType>(), { ...defaultProps });
  const { modelValue } = toRefs(props);
  
  const _visible = ref(props.modelValue);
  watch(_visible, value => emits("update:modelValue", value));
  watch(modelValue, value => _visible.value = value);

  const baseFormRef = ref<BaseFormInstance>();
  const handleOk = async () => {
    const res: AnyPropName = await baseFormRef.value?.submit();
    emits("submit", res);
  }

  const onChange = (key: string, value: any) => {
    emits("formChange", key, value);
  }

  // 重置表单后会触发n次 change 响应事件
  const resetFields = () => {
    baseFormRef.value?.resetFields();
  }

  const getFormState = (payload?: string | string[]): string | object | undefined => {
    return baseFormRef.value?.getFormState(payload);
  };

  const setFormState = (key: string | AnyPropName, value: any) => {
    baseFormRef.value?.setFormState(key, value);
  }

  defineExpose({ getFormState, setFormState, resetFields });
</script>