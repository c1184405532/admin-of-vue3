
// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const defaultProps = {
  expand: false,
  showItemNum: 6,
  colSpan: 8, // n / 24
  labelCol: () => ({ span: 4, offset: 0 })
}

export { defaultProps };

