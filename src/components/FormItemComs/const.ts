
// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const formItemDefaultProps = {
  change: () => undefined, // 设置空函数,避免调用出错; 在组件中就不用判断 typeof change
}

export {
  formItemDefaultProps
}