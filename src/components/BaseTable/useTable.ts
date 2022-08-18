import { ref } from "vue";
import request from "@/request";

import type { AnyPropName } from "@types";

const useGetTableList = async (url: string, query: AnyPropName) => {
  const data = ref({});
  data.value = await request.post(url, query, {});
  return { data };
}

export { useGetTableList }