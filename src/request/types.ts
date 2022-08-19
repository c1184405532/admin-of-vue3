import type { AxiosRequestConfig } from "axios";
import type { AnyPropName } from "@types";

interface RequestConfig extends AxiosRequestConfig {
  isAddToken: boolean, // 接口请求是否需要附带token
}

interface RequestInstance {
  post: (url: string, payload: AnyPropName, config?: AnyPropName) => Promise<AnyPropName>
}

export type { RequestConfig, RequestInstance };