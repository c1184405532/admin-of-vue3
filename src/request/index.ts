import request from "./request";

import type { AxiosRequestConfig } from "axios";
import type { AnyPropName } from "@types";
import type { RequestConfig, RequestInstance } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RequestAxios: RequestInstance = {};

// todo config: AnyPropName 后期由个人需求自定义key value 之后设置校验类型

const initAxiosConfig = (config: AxiosRequestConfig) : RequestConfig => ({ isAddToken: true, ...config }); // 扩展有额外默认参数需合并时，直接返回 ({...ohterConfig, ...config })

RequestAxios.post = (url: string, payload: AnyPropName, config: AnyPropName) => {
  return request.post(url, payload, initAxiosConfig(config));
}

// todo get put delete upload exportFile

export default RequestAxios;