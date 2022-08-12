import type { AnyPropName }  from "@types"

// defineProps 暂时不支持外部导入使用,等待 vue3 官方修复; https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
interface FormItemProps {
  modelValue: any, // v-model响应值
  name: string, // 数据键
  label: string, // 表单项文本名
  rules?: [Record<string, unknown>], // 校验规则 同antd 表单校验规则一致
  change?: (value: any, key: string) => void, // 当前项值变化时触发
  props?: object, // 组件额外 props 同antd组件props一致
}

// const emits = difineEmits<FormItemEmits>(); FormItemEmits 暂时不支持外部导入使用; 当你修改这里时,还需要进入实际单文件组件进行修改如FormItemInput组件
interface FormItemEmits {
  (e: "update:modelValue", value: any): void,
  (e: "onChange", value: any, key: string): void,
}

interface FormListRowType {
  key: string, // 数据键名
  type: string, // 组件类型
  label: string,
  span?: number, // 当前表单一行占多少列（span/24）
  defaultValue?: string | number | boolean | string[],
  rules?: [], // 校验规则
  options?: Array<AnyPropName>, // 选择框数据 
  props?: object // 实际内容组件的props集合同antd props 一致; 如 a-input -> placeholeder; 详细信息请前往独立组件中的提示进行查看
}

export type {
  FormItemProps,
  FormItemEmits,
  FormListRowType
}