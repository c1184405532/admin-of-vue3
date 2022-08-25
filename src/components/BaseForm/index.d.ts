import type { AnyPropName } from "@types";

interface BaseFormInstance {
  getFormState: (payload?: string | string[]) => string | object,
  setFormState: (key: string | AnyPropName, value: any) => void,
  resetFields: () => void,
  submit: (nameList?: string | string[]) => Promise[AnyPropName]
}

export type { BaseFormInstance };