<template>
  <a-table
    sticky
    :pagination="_pagination"
    v-bind="props"
    :columns="_columns"
    :data-source="tableSource"
    :loading="loading"
    @change="tableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <template v-for="o in (getOperations(column).length > 3 ? getOperations(column).slice(0, 2) : getOperations(column))" :key="o.value">
          <a v-if="o.value !== `delete`" @click="handClick(o.value, record)" class="operation-text">{{ o.label }}</a>
          <a-popconfirm v-else
            :title="confirmTitle"
            ok-text="确定"
            cancel-text="取消"
            @confirm="handClick(o.value, record)"
          >
            <a class="operation-text">{{ o.label }}</a>
          </a-popconfirm>
        </template>
        
        <a-dropdown v-if="getOperations(column).length > 3">
          <a @click.prevent>更多 <DownOutlined /></a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="o in getOperations(column).slice(2)" :key="o.value">
                <a v-if="o.value !== `delete`" @click="handClick(o.value, record)" class="operation-text">{{ o.label }}</a>
                <a-popconfirm v-else
                  :title="confirmTitle"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handClick(o.value, record)"
                >
                  <a class="operation-text">{{ o.label }}</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
    <!-- <template #summary>
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
    </template> -->
  </a-table>
</template>

<script lang="ts" setup>
  // BaseTableProps 详细参数请查阅官方文档 https://www.antdv.com/components/table-cn#API

  import { ref, watch, toRefs, onBeforeMount, watchEffect, computed } from "vue";

  import { DownOutlined } from "@ant-design/icons-vue";

  import type { TableColumnsType, TableProps } from "ant-design-vue";
  import type { AnyPropName } from "@types";

  import { baseTableDefaultProps, defaultOperations } from "./const";

  import { useGetTableList } from "./useTable";

  // todo 修改后记得删除无用组件 和 删除  components.d.ts中的组件引用

  interface BaseTableProps extends TableProps {
    // data: Array<AnyPropName>, // 表格数据
    columns: TableColumnsType, // 列头数据,
    // total: number,
    query: AnyPropName,
    confirmTitle?: string,
    scroll?: { x?: string | number | true , y?: string | number, scrollToFirstRowOnChange?: boolean}, // 表格是否可滚动，也可以指定滚动区域的宽、高，
  }
  
  //const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<BaseTableProps>(), { ...baseTableDefaultProps });
  const { columns, query, confirmTitle } = toRefs(props);
  
  const fixedTop = ref(false);
  const tableSource = ref([]);
  const _columns = ref<AnyPropName[]>([]);

  const loading = ref(false);
  const tableTotal = ref(0);
  const pagination: AnyPropName = ref({});
  // watchEffect监听了所有引用的值; 导致初始化时对pagination.value.total = res.total 会再次触发 getTableList 导致重复调用请求;
  // 所以这里用 tableTotal 独立赋值
  const _pagination: AnyPropName = computed(() => ({ ...pagination.value, total: tableTotal.value }));
  const filters = ref({});
  const sorter = ref({});

  watch(columns, () => setColumns(), { deep: true });

  watchEffect(() => getTableList());

  const handClick = (type: string, record: AnyPropName)  => {
    console.log("handClick", type, record)
  }

  const setColumns = () => {
    // console.log("setColumns");
    
  const newColumns: any[] = [];
    columns.value.forEach((c: any) => {
      //console.log("c", c);
      
      newColumns.push({
        dataIndex: c.dataIndex || c.key,
        fixed: c.key === "operation" ? "right" : undefined,
        width: c.key === "operation" ? 158 : undefined,
        ...c,
      })
    })
    _columns.value = newColumns;
  }

  setColumns();


  const tableChange = (p: AnyPropName, f: AnyPropName, s: AnyPropName) => {
    console.log("pagination", p);
    console.log("filters", f);
    console.log(" sorter", s);
    pagination.value = p; // getTableList 中使用了 pagination; 当 pagination 改变时触发 watchEffect;
    filters.value = f;
    sorter.value = s;
  }

  async function getTableList() {
    const payload = {
      ...pagination.value,
      ...query.value,
      current: pagination.value.current || 1,
      size: pagination.value.pageSize || 10
    }
    
    loading.value = true;

    const  { data } = await useGetTableList("repairOrder/queryPage", payload);
    console.log("getTableList", data.value);
    tableSource.value = data.value?.records || [];
    tableTotal.value = data.value?.total || 0;

    loading.value= false;
  }

  const getOperations = (column: AnyPropName) : any[] => {
    const operations = column.operations || defaultOperations;
    if (operations.length > 3) {
      operations
    }
    return operations
  }

</script>

<style lang="less" scoped>
  .operation-text{
    padding-right: 12px;
    &:last-child{
      padding-right: 0;
    }
  }
</style>