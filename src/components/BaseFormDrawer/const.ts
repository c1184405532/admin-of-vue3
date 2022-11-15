import type { DrawerProps } from "ant-design-vue";
import type { TopBtnsType } from "./index.d";

const defaultTopBtns: TopBtnsType = [
  { label: "关闭", value: "close", type: "default" }, { label: "保存", value: "submit", type: "primary" }
];

const defaultProps = {
  title: "",
  width: 1000,
  placement: <DrawerProps["placement"]>"right",
  loading: false,
  loadingTip: "",
  delayTime: 200,
  topBtns: () => (defaultTopBtns)
}

const defaultBaseFormProps = { // 表单默认一行四个, 如需自定义可在formData set formItemProps: {labelCol: {...code}},
  colSpan: 6, // n / 24
  labelCol: { span: 6, offset: 0 },
  wrapperCol: {},
}

export { defaultProps, defaultBaseFormProps };