import type { AnyPropName, FormListRowType } from "@types";

interface PropsType {
  data: Array<FormListRowType>, // 表单数据源
  expand?: boolean, // 默认是否展开所有项
  showItemNum?: number, // 显示表单项个数, 超过折叠
  colSpan?: number // 表单项一行占多少列 n/24
  labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
}

interface FormSearchEmits {
  (e: "change", value: any, key: string): void,
}

export type { PropsType, FormSearchEmits }