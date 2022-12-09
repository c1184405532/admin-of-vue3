
// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const defaultProps = {
  loading: false,
  loadingTip: "loading...",
  delayTime: 500,
  expand: false,
  showItemNum: 8, // 超过 showItemNum 数量的表单项折叠隐藏
  colSpan: 6, // n / 24
  labelCol: () => ({ span: 6, offset: 0 })
}

export { defaultProps };

