
import request from "@/request";
import type { AnyPropName } from "@types";

// 如需其他业务参数, 请在 data 同层扩展
interface RequestResponse {
  data: {
    records: AnyPropName[],
    total: number,
    [propname: string]: any
  }
}

// 注意：当前函数只是获取数据, 并未设置响应式, 如需修改数据, 请修改 tableSource;
// 这里使用函数转接一次的原因是, 可以独立设置你的逻辑, 而无需修改 basetable/index.vue;
const useGetTableList = async (url: string, query: AnyPropName) : Promise<RequestResponse> => {
  const data = (await request.post(url, query)) || { data: { records: [], total: 0 } };
  return <RequestResponse>{ data };
}

export { useGetTableList }