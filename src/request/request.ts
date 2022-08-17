import axios, { AxiosRequestConfig } from "axios";

import type { RequestConfig } from "./types";
import { BASE_URL, TIMEOUT, getToken } from "./config";

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
})

// config包含 axios 和你 initAxiosConfig 合并后的配置
instance.interceptors.request.use(
  (axiosConfig: AxiosRequestConfig) => {
    const config = <RequestConfig>axiosConfig;
    const token = getToken();
    console.log("config->", config);
    if (token && config.isAddToken) config.headers!["Authorization"] = token;
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => {
    const { status, data, config } = response;
    const requestConfig = <RequestConfig>config; 
    console.log("requestConfig->", requestConfig);
    console.log("response->", response);
    if (status === 200 || data.code === 200) return data;
    else {
      // todo 非200状态码需要做的一些事物
    }
  },
  err => {
    console.log("responseerr->", err);
    const { response: { data, status }} = err;
    if (data.code === 401 || status === 401) {
      // todo 登陆过期或授权未通过

    } else {
      // todo 提示错误信息



      // 防止使用 await xx接口抛错时无需加入 try catch。
      // 例子： const res = await getTabelList(url, payload, config);
      // if (res) 你的逻辑
      // 如果返回reject 会使await之后的代码无法执行。
      return undefined;
    }
  }
)

export default instance;