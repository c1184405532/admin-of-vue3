
import type { TableColumnType } from "ant-design-vue";
import type { FormListRowType } from "@components/FormItemComs/types";

interface AnyPropName {
  [propname: string | symbol]: any
}

interface BaseTableColumnType extends TableColumnType {
  operations?: {label: string, value: any}[]
}

interface BaseTableColumnsType {
  [index: number]: BaseTableColumnType
}

export type {
  FormListRowType,
  AnyPropName,
  BaseTableColumnType,
  BaseTableColumnsType
}