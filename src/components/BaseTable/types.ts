
import type { ButtonProps } from "ant-design-vue";

interface HeaderBtnType extends ButtonProps {
  label: string,
  value: string | number,
}

type HeaderBtnsType = HeaderBtnType[];

export type { HeaderBtnType, HeaderBtnsType }