
import type { FormItemEmits, FormItemProps, FormListRowType } from "@/components/FormItemComs/index.d";
import type { PropsType as FormSearchProps, FormSearchEmits, FormSearchRef } from "@components/FormSearch";
import type {
  BaseTableColumnsType,
  BaseTableColumnType,
  HeaderBtnsType,
  HeaderBtnType,
  TableRef
} from "@components/BaseTable";

interface AnyPropName {
  [propname: string | symbol]: any
}

export type {
  AnyPropName,

  FormItemProps,
  FormItemEmits,
  FormListRowType,

  FormSearchProps,
  FormSearchEmits,
  FormSearchRef,

  BaseTableColumnType,
  BaseTableColumnsType,
  HeaderBtnsType,
  HeaderBtnType,
  TableRef
}