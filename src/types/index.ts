
import type { TableColumnType } from "ant-design-vue";
import type { FormListRowType } from "@components/FormItemComs/types";

interface AnyPropName {
  [propname: string | symbol]: any
}

interface BaseTableColumnType extends TableColumnType {
  operations?: {label: string, value: any}[],
  type?: "slot" // 设置slot时, key 就是你的 slot name
}

type BaseTableColumnsType = BaseTableColumnType[]

export type {
  FormListRowType,
  AnyPropName,
  BaseTableColumnType,
  BaseTableColumnsType
}