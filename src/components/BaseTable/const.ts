// 默认值为引用类型的, 需要包装一个函数 return 出去 key: () => [0, 0] | {};
const baseTableDefaultProps = {
  scroll: () => ({ x: 1500 }),
  confirmTitle: "确定删除当前数据吗?"
}

const defaultOperations = [
  { label: "查看", value: "view" },
  { label: "编辑", value: "edit" },
  { label: "删除", value: "delete" }
]

export { baseTableDefaultProps, defaultOperations };