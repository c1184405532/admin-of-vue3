
interface FormListRowType {
  key: string, // 数据键名
  type: string, // 组件类型
  label: string,
  defaultValue?: string | number | boolean | string[],
  rules?: Array<AnyPropName>, // 校验规则
  options?: Array<AnyPropName>, // 选择框数据 
  props?: object // 实际内容组件的props集合 如 a-input -> placeholeder; 详细信息请前往独立组件中的提示进行查看

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
    key: "vehicleLicenseNo",
    type: "input",
    label: "车牌号",
    defaultValue: "",
    rules: [{ required: false, message: "" }],
    // change: (v: any) => { console.log("vvv", v)},
    props: {
      placeholder: "请输入姓名"
    }
  },
  {
    key: "age",
    type: "input-number",
    label: "年龄",
    tip: "年龄选择范围区间18-45",
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
    rules: [{ required: true, message: "Please input your username" }],
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
    defaultValue: "028",
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
      // picker: "quarter",
      // picker: "year",
      placeholder: "请选择日期",
      // showTime: { format: "HH:mm:ss" }
    }
  }
  ,
  {
    key: "dateRange",
    type: "date-range-picker",
    label: "选择日期",
    defaultValue: [],
    options: cityOptions,
    aa: 1,
    props: {
      // picker: "quarter",
      // picker: "week",
      showTime: { format: "HH:mm:ss" },
      placeholder: ["开始日期", "结束日期"]
    }
  }
]
import type { BaseTableColumnsType } from "@types"
const columns: BaseTableColumnsType = [
  {
    title: "车牌号",
    width: 100,
    key: "vehicleLicenseNo",
    fixed: "left",
  },
  {
    title: "接车地点",
    // width: 300,
    // dataIndex: "age",
    key: "pickupAddr",
    //fixed: "left",
  },
  {
    title: "维修店铺",
    // dataIndex: "address",
    key: "shopName",
    // width: 150,
  },
  {
    title: "Column 2",
    //dataIndex: "address",
    key: "address",
    type: "slot",
    // width: 150,
  },
  {
    title: "Column 3",
    //dataIndex: "address",
    key: "address2",
    // width: 150,
    type: "slot",
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    // width: 100,
    operations: [
      { label: "查看", value: "view" },
      { label: "编辑", value: "edit" },
      // { label: "出单", value: "createOrder" },
      { label: "删除", value: "delete" },
    ]
  },
];

import type { HeaderBtnsType } from "@components/BaseTable";

const tableHeaderBtns: HeaderBtnsType = [
  { label: "新增", value: "add", type: "primary" },
  { label: "导出文件", value: "export", type: "default", danger: true },
  { label: "修改列头", value: "changColumns", type: "default" },
]

const data = [];

for (let i = 0; i < 100; i++) {
data.push({
  key: i,
  name: `Edrward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
});
}

export {
  formList,
  data,
  columns,
  tableHeaderBtns
}

export type { FormListRowType, AnyPropName }