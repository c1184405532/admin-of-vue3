import type { ButtonProps } from "ant-design-vue";
import type { HeaderBtnsType, FormListDatas } from "@types";
import type { PropsType } from "@components/BaseForm/index";

interface BaseFormPropsType extends Omit<PropsType, "data"> {
  data?: undefined,
}

interface BaseFormDrawerType {
  key: string, // 每个 collapse-panel key
  title: string, // 每个 collapse-panel title
  formData: FormListDatas, // 表单数据
  formProps?: BaseFormPropsType, // 表单props
  headerBtns?: HeaderBtnsType, // collapse-panel 内按钮组数据
  collapsePanelActive?: boolean, // 当前 collapse-panel 是否展开 默认true
  ref: string, // 当前 collapse-panel form 的 ref, 用于表单提交(ref.submit)
}

interface TopBtnType extends ButtonProps {
  label: string,
  value: string,
}

interface TopBtnType extends ButtonProps {
  label: string,
  value: string,
}

interface formChangType extends ButtonProps {
  key: string,
  value: any,
}

type TopBtnsType = TopBtnType[];
type BaseFormDrawerListType = BaseFormDrawerType[];
type DrawerClickDataType = {key: string, value: string, headerBtn: HeaderBtnType, panel: BaseFormDrawerType};
type DrawerChangeDataType = {key: string, value: any, form: formChangType, panel: BaseFormDrawerType};

export type {TopBtnType, TopBtnsType, BaseFormDrawerType, BaseFormDrawerListType, DrawerClickDataType, DrawerChangeDataType};