
import { FormItemProps, FormItemEmits } from "@types";

export function useChange(emits: FormItemEmits, props: FormItemProps, value: any) {
  const { change, name } = props;
  emits("update:modelValue", value); // v-model响应
  emits("onChange", name, value); // formSearch事件响应
  change!(name, value); // 数据项中传入的事件响应
}