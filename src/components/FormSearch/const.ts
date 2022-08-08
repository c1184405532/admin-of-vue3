
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

const cityOptions = [
  {
    label: "成都", value: "028", children: [
      { label: "武侯区", value: "0281" },
      { label: "锦江区", value: "0282" },
      { label: "成华区", value: "0283" }
    ]
  },
  {
    label: "北京", value: "010", children: [
      { label: "丰台区", value: "0101" },
      { label: "朝阳区", value: "0102" },
      { label: "东城区", value: "0103" }
    ]
  },
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
    type: "input-number",
    label: "年龄",
    defaultValue: 20,
    props: {
      placeholder: "请输入年龄",
      min: 1,
      max: 100
    }
  },
  {
    key: "textarea",
    type: "textarea",
    label: "描述信息",
    defaultValue: "",
    props: {
      placeholder: "请输入描述信息",
      autoSize: true
    }
  },
  {
    key: "address",
    type: "select",
    label: "地址",
    defaultValue: undefined,
    options: addressOptions,
    props: {
      // mode: "multiple",
      showSearch: true,
      placeholder: "请选择地址"
    }
  },
  {
    key: "city",
    type: "tree-select",
    label: "城市",
    defaultValue: undefined,
    options: cityOptions,
    props: {
      // multiple: true,
      // treeCheckable: true,
      showSearch: true,
      placeholder: "请选择城市"
    }
  },
  {
    key: "date",
    type: "date-picker",
    label: "选择日期",
    defaultValue: undefined,
    options: cityOptions,
    props: {
      picker: "quarter",
      // picker: "week",
      placeholder: "请选择日期"
    }
  }
]

export {
  formList
}

export type { FormListRowType, AnyPropName }