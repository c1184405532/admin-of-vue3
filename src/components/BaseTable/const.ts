// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const baseTableDefaultProps = {
  scroll: () => ({ x: 1500 }),
}

export { baseTableDefaultProps };