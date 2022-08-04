
interface FormListRowType {
  key: string,
  type: string,
  label: string,
  defaultValue?: string | number | boolean,
  rules?: [], // 校验规则
  options?: Array<AnyPropName>, // 选择框数据 
  props?: object // 实际内容组件的props集合 如 a-input -> placeholeder

}

interface AnyPropName {
  [propname: string | number | symbol]: any
}

const addressOptions = [
  { label: "成都", value: "028" },
  { label: "北京", value: "010" },
]

const formList = [
  {
    key: "userName",
    type: "input",
    label: "用户名",
    defaultValue: "",
    props: {
      placeholder: "请输入姓名"
    }
  },
  {
    key: "age",
    type: "input",
    label: "年龄",
    defaultValue: 20,
    props: {
      placeholder: "请输入年龄"
    }
  },
  {
    key: "address",
    type: "select",
    label: "地址",
    defaultValue: undefined,
    options: addressOptions,
    props: {
      mode: "multiple",
      showSearch: true,
      placeholder: "请选择地址"
    }
  }
]

export {
  formList
}

export type { FormListRowType, AnyPropName }