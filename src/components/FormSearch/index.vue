<template>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      :labelCol="labelCol"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="(item, i) in data" :key="item.key">
          <a-col v-show="_expand || i < showItemNum" :span="item.span || colSpan">
            <component
              @onChange="onChange"
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
          <a-button style="margin: 0 8px" @click="resetFields">重置</a-button>
          <a style="font-size: 12px" @click="_expand = !_expand">
            <template v-if="_expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            {{ _expand ? "折叠" : "展开" }}
          </a>
        </a-col>
      </a-row>
    </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, onBeforeMount, toRefs, nextTick } from "vue";
  import type { FormInstance } from "ant-design-vue";
  import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

  import type { AnyPropName, FormListRowType } from "@types";

  import { defaultProps } from "./const";
  import ComponentMap from "@components/FormItemComs";
  
  interface PropsType {
    data: Array<FormListRowType>, // 表单数据源
    expand?: boolean, // 默认是否展开所有项
    showItemNum?: number, // 显示表单项个数, 超过折叠
    colSpan?: number // 表单项一行占多少列 n/24
    labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
  }

  interface FormSearchEmits {
    (e: "change", value: any, key: string): void,
  }

  const emits = defineEmits<FormSearchEmits>();

  const props = withDefaults(defineProps<PropsType>(), {...defaultProps});
  const { data, expand, labelCol, showItemNum } = toRefs(props);
  
  
  const formRef = ref<FormInstance>();
  let formState = reactive<AnyPropName>({});
  const _expand = ref(expand?.value);

  // watch(formState, (value, prev) => {
  //   // todo value = formstate  need formState[change key]
  //   console.log(value);
  //   console.log(prev);
  // })

  onBeforeMount(() => {
    setDefaultFormState();
  })
  
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    console.log("formState: ", formState);
  };

  // 对 component 使用 onChange 的原因是组件本身有change事件这里不进行混合; 并且change参数类型也不相同会提示报错
  const onChange = (value: any, key: string): void => {
    emits("change", value, key);
  }

  const setDefaultFormState = () => {
    data.value.forEach(v => {
      if (formState[v.key] !== v.defaultValue) formState[v.key] = v.defaultValue;      
    });
  }

  // 重置表单后会触发n次 change 响应事件
  const resetFields = () => {
    formRef.value?.resetFields(); // 清空表单状态; 当通过setFormState重新设置值之后,只调用resetFields一次无法重置
    nextTick(() => { 
      setDefaultFormState(); // 也可以再调用一次 formRef.value?.resetFields(); 但是这样重新设置的 data[n].defaultValue 无法生效;
    });
  }

  // todo set states getstates getstate(key)

  const getFormState = () => ({ ...formState });

  const setFormState = (key: string, value: any) => {
    formState[key] = value;
  }

  defineExpose({ getFormState, setFormState });
</script>
