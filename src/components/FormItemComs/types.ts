// defineProps 暂时不支持外部导入使用,留着等待 vue3 官方修复
interface FormItemPropsType {
  modelValue: any, // v-model响应值
  name: string, // 数据键
  label: string, // 表单项文本名
  rules?: [Record<string, unknown>], // 校验规则 同antd 表单校验规则一致
  change?: (value: any, key: string) => void, // 当前项值变化时触发
  props?: object, // 组件额外 props 同antd组件props一致
}

export type {
  FormItemPropsType
}