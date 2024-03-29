
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
import type { BaseTableColumnsType, BaseFormDrawerListType, FormListDatas } from "@types"
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

const createFormDrawerData = (): FormListDatas => {
  const sexOptions = [
    { label: "男", value: "man" },
    { label: "女", value: "woman" },
  ]
  return [
    {
      key: "name",
      type: "input",
      label: "姓名",
      defaultValue: "",
      options: [],
      props: {
        placeholder: "请输入姓名",
      },
      formItemProps: {labelCol: {flex: "55px"}},
      rules: [{ required: true, message: "请输入姓名!" }],
    },
    {
      key: "age",
      type: "input-number",
      label: "年龄",
      defaultValue: "",
      options: [],
      props: {
        placeholder: "请输入年龄",
      },
      formItemProps: {labelCol: {flex: "55px"}},
      rules: [{ required: true, message: "请输入年龄!" }],
    },
    {
      key: "avatar",
      type: "upload",
      label: "头像",
      defaultValue: "",
      span: 12,
      formItemProps: {labelCol: {flex: "55px"}},
      props: {
        placeholder: "请上传头像",
      },
      options: sexOptions, 
      rules: [{ required: true, message: "请上传头像!" }],
    },
    {
      key: "address",
      type: "address",
      label: "地址",
      defaultValue: "",
      span: 12,
      formItemProps: {labelCol: {flex: "55px"}},
      props: {
        placeholder: "请输入地址",

      },
      options: [],
      rules: [{ required: true, message: "请输入地址!" }],
    },
    {
      key: "sex",
      type: "select",
      label: "性别",
      defaultValue: "",
      span: 12,
      formItemProps: {labelCol: {flex: "55px"}},
      props: {
        placeholder: "请选择性别",
      },
      options: sexOptions, 
      rules: [{ required: true, message: "请输入性别!" }],
    }
  ]
}

const createBaseFormDrawerList = (config = {}): BaseFormDrawerListType => {
  /**
   * @param { Boolean } collapsePanelActive 面板是否展开
   * @param { Boolean } loading 面板loading状态
   * @param { String } title 面板标题
   * @param { Array } headerBtns 面板按钮组
   * @param { String } ref 面板ref名，用于获取输入数据
   */
  const formData = createFormDrawerData();
  return [
    {
      key: "userInfo",
      title: "用户信息",
      formData: formData,
      headerBtns: [{ label: "保存信息", value: "addUserInfo" }],
      // collapsePanelActive: true,
      ref: "userInfoRef"
    },
    {
      key: "custom",
      title: "自定义slot",
      formData: [],
      slots: [{name: "custom", data: {city: "成都"}}],
      // headerBtns: [{ label: "保存信息", value: "addUserInfo" }],
      // collapsePanelActive: true,
      ref: "customRef"
    }
  ]
};

import type { ChartOptions, PieOptions, GaugeOptions, LiquidOptions } from "@components/G2Charts/index.d";
const defaultData = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
  { year: "1999", value: 8 },
]
const defaultLineOptions: ChartOptions = {
  padding: "auto",
  xField: "year",
  yField: "value",
  data: defaultData
}

const defaultPieOptions: PieOptions = {
  appendPadding: 10,
  data: defaultData,
  angleField: "value",
  colorField: "year",
  radius: 0.9,
  // label: {
  //   type: "inner",
  //   offset: "-30%",
  //   content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  //   style: {
  //     fontSize: 14,
  //     textAlign: "center",
  //   },
  // },
  interactions: [{ type: "element-active" }],
}

const defaultGaugeOptions: GaugeOptions = {
  percent: 0.75,
  range: {
    color: "#30BF78",
  },
  indicator: {
    pointer: {
      style: {
        stroke: "#D0D0D0",
      },
    },
    pin: {
      style: {
        stroke: "#D0D0D0",
      },
    },
  },
  axis: {
    label: {
      formatter(v: string) {
        return Number(v) * 100;
      },
    },
    subTickLine: {
      count: 3,
    },
  },
  statistic: {
    content: {
      formatter: ({ percent }: any) => `Rate: ${(percent * 100).toFixed(0)}%`,
      style: {
        color: "rgba(0,0,0,0.65)",
        fontSize: "48",
      },
    },
  },
}

const defaultLiquidOptions: LiquidOptions = {
  percent: 0.25,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
}

export {
  formList,
  data,
  columns,
  tableHeaderBtns,
  createBaseFormDrawerList,
  defaultLineOptions,
  defaultPieOptions,
  defaultGaugeOptions,
  defaultLiquidOptions
}

export type { FormListRowType, AnyPropName }