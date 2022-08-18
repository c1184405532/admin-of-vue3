<template>
  <a-table
    sticky
    :pagination="{total: props.total}"
    v-bind="props"
    :columns="_columns"
    :data-source="tableSource"
    @change="tableChange"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'"><a>action</a></template>
    </template>
    <template #summary>
      <a-table-summary :fixed="fixedTop ? 'top' : 'bottom'">
        <a-table-summary-row>
          <a-table-summary-cell :index="0" :col-span="2">
            <a-switch
              v-model:checked="fixedTop"
              checked-children="Fixed Top"
              un-checked-children="Fixed Top"
            ></a-switch>
          </a-table-summary-cell>
          <a-table-summary-cell :index="2" :col-span="8">Scroll Context</a-table-summary-cell>
          <a-table-summary-cell :index="10">Fix Right</a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  // BaseTableProps 详细参数请查阅官方文档 https://www.antdv.com/components/table-cn#API

  import { ref, watch, toRefs } from "vue";

  import type { TableColumnsType, TableProps } from "ant-design-vue";
  import type { AnyPropName } from "@types";

  import { baseTableDefaultProps } from "./const";

  import { useGetTableList } from "./useTable";

  // todo 修改后记得删除无用组件 和 删除  components.d.ts中的组件引用

  interface BaseTableProps extends TableProps {
    data: Array<AnyPropName>, // 表格数据
    columns: TableColumnsType, // 列头数据,
    total: number,
    scroll?: { x?: string | number | true , y?: string | number, scrollToFirstRowOnChange?: boolean}, // 表格是否可滚动，也可以指定滚动区域的宽、高，
  }
  
  //const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<BaseTableProps>(), { ...baseTableDefaultProps });
  const { columns, data } = toRefs(props);
  
  const fixedTop = ref(false);
  const tableSource = ref([]);
  const _columns = ref<AnyPropName[]>([]);

  const pagination = {
    total: 100
  }

  watch(columns, () => setColumns(), { deep: true });
  
  const setColumns = () => {
    // console.log("setColumns");
    
  const newColumns: any[] = [];
    columns.value.forEach((c: any) => {
      //console.log("c", c);
      
      newColumns.push({
        dataIndex: c.dataIndex || c.key,
        ...c,
      })
    })
    _columns.value = newColumns;
  }

  setColumns();


  const tableChange = (pagination, filters, sorter) => {
    console.log("pagination", pagination);
    console.log("filters", filters);
    console.log(" sorter", sorter);
    getTableList(pagination)
  }

  const getTableList = async(pagination = {}) => {
    const payload = {
      cityCode: "028",
      typeSet: [1, 2],
      ...pagination,
      current: pagination.current || 1,
      size: pagination.pageSize || 10
    }
    const { data } = await useGetTableList("repairOrder/queryPage", payload,)
    console.log("getTableList", data.value);
    tableSource.value = data.value.records || [];
  }

  getTableList();

</script>