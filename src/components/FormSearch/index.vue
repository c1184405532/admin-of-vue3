<template>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="(item, i) in data" :key="item.key">
          <a-col v-show="expand || i < showItemNum" :span="item.span || colSpan">
            <component
              @change="onChange"
              :is="ComponentMap[item.type]"
              v-model="formState[item.key]"
              v-bind="item"
              :name="item.key"
            />
          </a-col>
        </template>
      </a-row>

      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef?.resetFields()">重置</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            {{ expand ? "折叠" : "展开" }}
          </a>
        </a-col>
      </a-row>
    </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, onBeforeMount, toRefs } from "vue";
  import type { FormInstance } from "ant-design-vue";
  import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

  import { FormListRowType, AnyPropName, defaultProps } from "./const";
  import ComponentMap from "@components/FormItemComs";

  
  interface PropsType {
    data: Array<FormListRowType>, // 表单数据源
    expand?: boolean, // 是否展开所有项
    showItemNum?: number, // 显示表单项个数, 超过折叠
    colSpan?: number // 表单一行占多少列
  }

  const props = withDefaults(defineProps<PropsType>(), {...defaultProps});
  const { data, expand, showItemNum } = toRefs(props);

  const emits = defineEmits(["change"])

  const formRef = ref<FormInstance>();
  const formState = reactive<AnyPropName>({});

  console.log("props data", data.value);
  
  // watch(formState, (value, prev) => {
  //   // todo value = formstate  need formState[change key]
  //   // console.log(value);
  //   // console.log(prev);
  // })

  onBeforeMount(() => {
    setDefaultFormState();
  })
  

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    console.log("formState: ", formState);
  };

  const onChange = (value: any, key: string) => {
    // console.log("onChange", value, key);
    // InputNumber 组件未监听事件时,当输入值,并失去焦点时会进入当前回调,且回调参数 value 为虚拟dom结构,未知bug; 此处判断key进行事件发送
    if (key) emits("change", value, key);
  }

  const setDefaultFormState = () => {
    data.value.forEach(v => {
      formState[v.key] = v.defaultValue;
    }) 
  }

</script>
