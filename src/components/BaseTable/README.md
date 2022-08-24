
## BaseTable 使用方法

### props 
  全部参数前往官网API https://www.antdv.com/components/table-cn#API

### columns
  列头数据 格式请参照 BaseTableColumnsType

### tableQueryParams
  接口查询参数, 当参数改变时, 会自动触发请求

### header-btns
  表格头部按钮, 用于其他点击操作: 新增 导出 批量删除等

### row-selection
  是否开启可勾选, 同antdv一致

### requestUrl
  请求地址 post 方式, 如需修改逻辑 或数据结构不一致 请前往 useTable.js 文件修改

### ref
  可通过ref使用表格实例下的 getTableList 函数 手动触发查询

### @click
  点击头部按钮或操作栏触发

## 使用代码

```js
  <template>
    <BaseTable
      @click="tableClick"
      :columns="tableColumns"
      :query="tableQueryParams"
      :header-btns="tableHeaderBtns"
      :row-selection="{ selectedRowKeys: refSelectedRowKeys, onChange: onSelectChange }"
      requestUrl="repairOrder/queryPage"
      ref="tableRef"
    >
      <template #address="{ record, column }">
        <span > 动态slot record:{{ record.salesName }} column.key(address): {{ column.key }}</span>
      </template>
    </BaseTable>
  </template>

  <script lang="ts" setup>
    import { ref, reactive } from "vue";
    import type { TableRef } from "@components/BaseTable";
    import BaseTable from "@components/BaseTable/index.vue";
    import { formList, columns, tableHeaderBtns } from "./const";
    
    type Key = string | number;
    const tableRef = ref<TableRef>();
    const tableColumns = reactive(columns);
    const tableQueryParams = ref({});
    const refSelectedRowKeys = ref<Key[]>([]);

    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      refSelectedRowKeys.value = selectedRowKeys
    };

    const tableClick = (type: string, data: any) => {
      console.log("type", type)
      console.log("tableClick data", data)
    }
  </script>

```
