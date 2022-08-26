import type { AnyPropName, FormListRowType } from "@types";

interface PropsType {
  data: Array<FormListRowType>, // 表单数据源
  loading?: boolean, // 是否加载中
  loadingTip?: string, // 自定义加载提示文案
  delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
  expand?: boolean, // 默认是否展开所有项
  showItemNum?: number, // 显示表单项个数, 超过折叠
  colSpan?: number // 表单项一行占多少列 n/24
  labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
}

interface FormSearchEmits {
  (e: "change", value: any, key: string): void,
  (e: "search", values: any): void,
}

interface FormSearchInstance {
  getFormState: (payload?: string | string[]) => string | object,
  setFormState: (key: string | AnyPropName, value?: any) => void,
}

export type { PropsType, FormSearchEmits, FormSearchInstance }