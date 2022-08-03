
interface FormListRowType {
  key: string,
  type: string,
  label: string,
  defaultValue?: string,
  rules?: [],
  props?: object // 实际内容组件的props集合 如 a-input -> placeholeder
}

interface AnyPropName {
  [propname: string | number | symbol]: any
}

const formList = [
  {
    key: "userName",
    type: "input",
    label: "用户名",
    defaultValue: "",
    props: {
      placeholder: "请输入姓名"
    }
  }
]

export {
  formList
}

export type { FormListRowType, AnyPropName }