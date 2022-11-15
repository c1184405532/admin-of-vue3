import type { AnyPropName } from "@types";

interface PropsType {
  data: FormListDatas, // 数据源
  loading?: boolean, // 是否加载中
  loadingTip?: string, // 自定义加载提示文案
  delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
  colSpan?: number // 表单项一行占多少列 n/24
  labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
  wrapperCol?: AnyPropName // 表单项 输入控件配置; 类型同 labelCol一致
}

interface BaseFormInstance {
  getFormState: (payload?: string | string[]) => string | object,
  setFormState: (key: string | AnyPropName, value?: any) => void,
  resetFields: () => void,
  submit: (nameList?: string | string[]) => Promise[AnyPropName]
}

export type { PropsType, BaseFormInstance };