
import type { BaseFormInstance } from "@components/BaseForm";
import type { BaseFormModalInstance } from "@components/BaseFormModal";
import type { FormItemEmits, FormItemProps, FormListRowType, FormListDatas } from "@/components/FormItemComs/index.d";
import type { PropsType as FormSearchProps, FormSearchEmits, FormSearchInstance } from "@components/FormSearch";
import type {
  BaseTableColumnsType,
  BaseTableColumnType,
  HeaderBtnsType,
  HeaderBtnType,
  BaseTableInstance
} from "@components/BaseTable";

import type { BaseFormDrawerType, BaseFormDrawerListType, DrawerClickDataType } from "@components/BaseFormDrawer"; 

interface AnyPropName {
  [propname: string | symbol]: any
}

export type {
  AnyPropName,
  BaseFormInstance,
  BaseFormModalInstance,

  FormItemProps,
  FormItemEmits,
  FormListRowType,
  FormListDatas,

  FormSearchProps,
  FormSearchEmits,
  FormSearchInstance,

  BaseTableColumnType,
  BaseTableColumnsType,
  HeaderBtnsType,
  HeaderBtnType,
  BaseTableInstance,

  BaseFormDrawerType,
  BaseFormDrawerListType,
  DrawerClickDataType
}