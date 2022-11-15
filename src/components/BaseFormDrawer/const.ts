import type { DrawerProps } from "ant-design-vue";
import type { TopBtnsType } from "./index.d";

const defaultTopBtns: TopBtnsType = [{ label: "关闭", value: "close", type: "default" }, { label: "保存", value: "submit", type: "primary" }];

// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const defaultProps = {
  // title: "新增",
  width: 1000,
  placement: <DrawerProps["placement"]>"right",
  loading: false,
  loadingTip: "",
  delayTime: 200,
  topBtns: () => (defaultTopBtns)
  // colSpan: 24, // n / 24
  // labelCol: () => ({ span: 4, offset: 0 }),
  // wrapperCol: () => ({ span: 18, offset: 0 })
}

const defaultBaseFormProps = {
  colSpan: 6, // n / 24
  labelCol: { span: 6, offset: 0 },
  wrapperCol: {},
}

export { defaultProps, defaultBaseFormProps };