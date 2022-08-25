import type { BaseFormInstance } from "@types";

interface BaseFormModalInstance extends Omit<BaseFormInstance, "submit"> {
  submit?: undefined,
}

export type { BaseFormModalInstance }