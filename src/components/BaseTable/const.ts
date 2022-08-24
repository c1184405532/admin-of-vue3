import type { PaginationProps } from "ant-design-vue";
import type { HeaderBtnsType, SizeType } from "./";

// 如需扩展额外默认参数请前往官网API https://www.antdv.com/components/table-cn#API
const baseTableDefaultProps = {
  size: <SizeType>"middle",
  scroll: () => ({ scrollToFirstRowOnChange: true, x: 1400, y: undefined }), // 当只设置x的值且y轴会超过屏幕显示区域, x会出现两个滚动条, 一个浏览器的,一个antd模拟的
  confirmTitle: "确定删除当前数据吗?"
}

// 如需扩展额外默认参数请前往官网API https://www.antdv.com/components/pagination-cn/#API
const defaultPagination: PaginationProps = {
  showSizeChanger: true,
  showTotal: (total: number) => `总数 ${total} 条`
}

const defaultOperations = [
  { label: "查看", value: "view" },
  { label: "编辑", value: "edit" },
  { label: "删除", value: "delete" }
]

const defaultHeaderBtns = {
  btns: (): HeaderBtnsType => ([{ label: "新增", value: "add", type: "primary" }])
} 

export { baseTableDefaultProps, defaultOperations, defaultPagination, defaultHeaderBtns };