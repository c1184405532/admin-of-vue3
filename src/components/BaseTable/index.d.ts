import type { ButtonProps } from "ant-design-vue";

interface HeaderBtnType extends ButtonProps {
  label: string,
  value: string | number,
}

type HeaderBtnsType = HeaderBtnType[];

type SizeType = "small" | "middle" | "large" | undefined;

interface TableRef {
  getTableList: () => void
}

export type { HeaderBtnType, HeaderBtnsType, SizeType, TableRef }