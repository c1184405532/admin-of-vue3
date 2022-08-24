<template>
  <a-spin :spinning="loading" :tip="loadingTip" :delay="delayTime">
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
            <a-tooltip :title="item.tip" :mouseEnterDelay="0.2">
              <component
                @onChange="onChange"
                :is="ComponentMap[item.type]"
                v-model="formState[item.key]"
                v-bind="item"
                :name="item.key"
              />
            </a-tooltip>
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
  </a-spin>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRefs, nextTick } from "vue";

  import ComponentMap from "@components/FormItemComs";
  import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

  import type { FormInstance } from "ant-design-vue";
  import type { AnyPropName, FormListRowType } from "@types";

  import { defaultProps } from "./const";
  
  interface PropsType {
    data: Array<FormListRowType>, // 表单数据源
    loading?: boolean, // 是否加载中
    loadingTip?: string, // 自定义加载提示文案
    delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
    expand?: boolean, // 默认是否展开所有项
    showItemNum?: number, // 显示表单项个数, 超过折叠
    colSpan?: number // 表单项一行占多少列 n/24
    labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
  }

  interface FormSearchEmits {
    (e: "change", value: any, key: string): void,
    (e: "search", values: any): void,
  }

  const emits = defineEmits<FormSearchEmits>();

  const props = withDefaults(defineProps<PropsType>(), {...defaultProps});
  const { data, loading, loadingTip, delayTime, expand, labelCol, showItemNum } = toRefs(props);
  

  const formRef = ref<FormInstance>();
  const formState = reactive<AnyPropName>({});
  const _expand = ref(expand?.value);
  

  const setDefaultFormState = () => {
    data.value.forEach(v => {
      if (formState[v.key] !== v.defaultValue) formState[v.key] = v.defaultValue;      
    });
  }
  
  setDefaultFormState();
  
  const onFinish = (values: any) => {
    emits("search", values);
  };

  let timeoutValidate: any;
  // 对 component 使用 onChange 的原因是组件本身有change事件这里不进行混合; 并且change参数类型也不相同会提示报错
  const onChange = (value: any, key: string): void => {
    emits("change", value, key);

    // 当数据变化时手动触发校验, 因为嵌套v-model导致表单自动校验会出现错误响应 预期与实际不一致
    clearTimeout(timeoutValidate);
    timeoutValidate = setTimeout(() => {
      formRef.value?.validateFields([key]);
    }, 120)
  }

  // 重置表单后会触发n次 change 响应事件
  const resetFields = () => {
    formRef.value?.resetFields(); // 清空表单状态; 当通过setFormState重新设置值之后,只调用resetFields一次无法重置
    nextTick(() => { 
      setDefaultFormState(); // 也可以再调用一次 formRef.value?.resetFields(); 但是这样重新设置的 data[n].defaultValue 无法生效;
    });
  }

  const getFormState = (payload?: string | string[]): string | object => {
    const type = payload ? typeof payload : "not";

    if (type === "not") return { ...formState };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (type === "string") return formState[payload];

    if (Array.isArray(payload)) {
      const ret: AnyPropName = {};
      payload.forEach(key => {
        ret[key] = formState[key]
      });
      return ret;
    }
    console.error(`传入参数类型需为 string | string[]; 当前参数${JSON.stringify(payload)}`);
    return {};
  };

  const setFormState = (key: string | AnyPropName, value: any) => {
    const type = key ? typeof key : "not";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (type === "string") formState[key] = value;
    else if (!Array.isArray(key) && type === "object") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const name in key) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formState[name] = key[name];
      }
    } else {
      console.error(`传入参数类型需为 string | object<{key: value}>; 当前参数${JSON.stringify(key)}`);
    }
  }

  defineExpose({ getFormState, setFormState });
</script>
