<template>
  <HeaderBtns :btns="props.headerBtns" @click="btn => handClick(btn.value, btn)"/>
  <a-table
    sticky
    :row-key="(record: any) => record.id || record.uid"
    v-bind="props"
    :row-selection="{ preserveSelectedRowKeys: true, ...props.rowSelection }"
    :pagination="_pagination"
    :columns="_columns"
    :data-source="tableSource"
    :loading="loading"
    @change="tableChange"
  >
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="column.key === `operation`">
        <template v-for="o in (getOperations(column).length > 3 ? getOperations(column).slice(0, 2) : getOperations(column))" :key="o.value">
          <a v-if="o.value !== `delete`" @click="handClick(o.value, record)" class="operation-text">{{ o.label }}</a>
          <a-popconfirm v-else
            :title="confirmTitle"
            placement="topLeft"
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
                  placement="topLeft"
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
      <template v-if="column.type === `slot`">
        <slot :name="column.key" :text="text" :record="record" :index="index" :column="column" />
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
  import HeaderBtns from "./HeaderBtns.vue";

  import type { TableProps, PaginationProps } from "ant-design-vue";
  import type { AnyPropName, BaseTableColumnsType } from "@types";
  import type { HeaderBtnsType } from "./types";

  import { baseTableDefaultProps, defaultOperations, defaultPagination } from "./const";

  import { useGetTableList } from "./useTable";

  // todo 修改后记得删除无用组件 和 删除  components.d.ts中的组件引用

  interface BaseTableProps extends Omit<TableProps, "columns"> {
    // data: Array<AnyPropName>, // 表格数据
    columns: BaseTableColumnsType, // 列头数据,
    requestUrl: string, // 请求地址
    query: AnyPropName, // 请求参数
    headerBtns?: HeaderBtnsType,
    confirmTitle?: string, // 点击删除按钮 弹窗标题
    rowSelection?: TableProps["rowSelection"], // 选择栏
    scroll?: { x?: string | number | true , y?: string | number, scrollToFirstRowOnChange?: boolean}, // 表格是否可滚动，也可以指定滚动区域的宽、高，
  }
  
  //const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<BaseTableProps>(), { ...baseTableDefaultProps });
  const { columns, query, confirmTitle, requestUrl } = toRefs(props);
  const fixedTop = ref(false);
  const tableSource = ref<AnyPropName[]>([]);
  const _columns = ref<AnyPropName[]>([]);


  let oldQuery: any = null;
  const loading = ref(false);
  const pagination = ref<PaginationProps>({});
  const filters = ref({});
  const sorter = ref({});

  // 整合默认 defaultPagination
  const _pagination = computed(() => ({
    ...pagination.value,
    ...defaultPagination,
  }));

  
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
    // console.log("filters", f);
    // console.log("sorter", s);
    pagination.value = p; // getTableList 中使用了 pagination; 当 pagination 改变时触发 watchEffect;
    filters.value = f;
    sorter.value = s;
  }

  async function getTableList() {
    // 当分页已经有数据的时候, 此时改变请求参数重新查询, 分页还是之前的, 很有可能查询数据失败, 需要重置分页;
    const isChange = isChangeQuery(oldQuery, query.value);
    if (isChange) pagination.value.current = 1;

    const payload = {
      ...query.value,
      current: pagination.value.current || 1,
      size: pagination.value.pageSize || 10
    }
    
    loading.value = true;

    const  { data } = await useGetTableList(requestUrl.value, payload);
    tableSource.value = data.records;
    pagination.value.total = data.total;

    loading.value = false;
    oldQuery = query.value;
  }

  const getOperations = (column: AnyPropName) : any[] => (column.operations || defaultOperations);

  function isChangeQuery(o: any, n: any): boolean {
    return JSON.stringify(o) !== JSON.stringify(n);
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