<template>
  <a-spin :spinning="loading" :tip="loadingTip" :delay="delayTime">
    <a-form
      ref="formRef"
      name="base-form-instance"
      v-bind="props"
      :model="formState"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-row :gutter="24">
        <template v-for="item in data" :key="item.key">
          <a-col :span="item.span || colSpan">
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
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive, nextTick } from "vue";

  import type { FormInstance } from "ant-design-vue";
  import type { AnyPropName, FormListDatas } from "@types";

  import ComponentMap from "@components/FormItemComs";
  import { defaultProps } from "./const";

  interface PropsType {
    data: FormListDatas, // 数据源
    loading?: boolean, // 是否加载中
    loadingTip?: string, // 自定义加载提示文案
    delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
    colSpan?: number // 表单项一行占多少列 n/24
    labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
    wrapperCol?: AnyPropName // 表单项 输入控件配置; 类型同 labelCol一致
  }

  const emits = defineEmits(["change"]);
  const props = withDefaults(defineProps<PropsType>(), { ...defaultProps }) // defineProps<>(["visible", "modelValue"]);
  const { data, loading, loadingTip, delayTime, labelCol } = toRefs(props);
  
  const formRef = ref<FormInstance>();
  const formState = reactive<AnyPropName>({});
  setDefaultFormState();

  let timeoutValidate: any;
  // 对 component 使用 onChange 的原因是组件本身有change事件这里不进行混合; 并且change参数类型也不相同会提示报错
  const onChange = (key: string, value: any): void => {
    emits("change", key, value);

    // 当数据变化时手动触发校验, 因为嵌套v-model导致表单自动校验会出现错误响应 预期与实际不一致
    clearTimeout(timeoutValidate);
    timeoutValidate = setTimeout(() => {
      formRef.value?.validateFields([key]);
    }, 120)
  }

  function setDefaultFormState() {
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

  const submit = async (nameList?: string | string[]): Promise<AnyPropName> => {
    return formRef.value!.validateFields(nameList);
  }

  defineExpose({ getFormState, setFormState, resetFields, submit });
</script>