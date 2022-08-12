
import { FormItemProps, FormItemEmits } from "./types";

export function useChange(emits: FormItemEmits, props: FormItemProps, value: any) {
  const { change, name } = props;
  emits("update:modelValue", value); // v-model响应
  emits("onChange", value, name); // formSearch事件响应
  change!(value, name); // 数据项中传入的事件响应
}