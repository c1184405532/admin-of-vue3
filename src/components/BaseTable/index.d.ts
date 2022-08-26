import type { ButtonProps, TableColumnType } from "ant-design-vue";

interface BaseTableColumnType extends TableColumnType {
  operations?: {label: string, value: any}[],
  type?: "slot" // 设置slot时, key 就是你的 slot name
}

interface HeaderBtnType extends ButtonProps {
  label: string,
  value: string | number,
}

interface BaseTableInstance {
  getTableList: () => void
}

type BaseTableColumnsType = BaseTableColumnType[]
type HeaderBtnsType = HeaderBtnType[];
type SizeType = "small" | "middle" | "large" | undefined;

export type {
  BaseTableColumnType,
  BaseTableColumnsType,

  HeaderBtnType,
  HeaderBtnsType,

  SizeType,
  BaseTableInstance
}