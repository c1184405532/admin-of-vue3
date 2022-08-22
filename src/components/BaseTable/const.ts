import type { PaginationProps } from "ant-design-vue";


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

// 如需扩展额外默认参数请前往官网API https://www.antdv.com/components/pagination-cn/#API
const defaultPagination: PaginationProps = {
  showSizeChanger: true,
  showTotal: (total: number) => `总数 ${total} 条`
}

export { baseTableDefaultProps, defaultOperations, defaultPagination };