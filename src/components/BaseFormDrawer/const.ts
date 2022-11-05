// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const defaultProps = {
  // title: "新增",
  width: 1000,
  loading: false,
  loadingTip: "",
  delayTime: 200,
  collapseActiveKey: "1",
  // colSpan: 24, // n / 24
  // labelCol: () => ({ span: 4, offset: 0 }),
  // wrapperCol: () => ({ span: 18, offset: 0 })
}

export { defaultProps };