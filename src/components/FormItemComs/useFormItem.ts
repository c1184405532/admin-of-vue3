
import { FormItemProps, FormItemEmits } from "@types";

export function useChange(emits: FormItemEmits, props: FormItemProps, value: any) {
  const { change, name } = props;
  emits("update:modelValue", value); // v-model响应
  emits("onChange", name, value); // form组件事件响应
  change!(name, value); // 数据项中传入的事件响应
}

export function useClick(emits: FormItemEmits, props: FormItemProps, value: any) {
  const { name } = props;
  emits("onClick", name, value); // form组件事件响应
}