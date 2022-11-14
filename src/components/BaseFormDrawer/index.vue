<template>
  <a-spin :spinning="loading" :tip="loadingTip" :delay="delayTime">
    <a-drawer
      v-bind="props"
      :visible="_visible"
      @close="onClose"
    >
      <template #extra>
        <TopBtns :btns="topBtns" @click="topBtnOnClick"/>
      </template>
      <a-collapse
        v-model:activeKey="_collapseActiveKey"
        expandIconPosition="right"
        class="drawer-collapse"
      >
        <a-collapse-panel v-for="panel in data" :header="panel.title" :key="panel.key">
          <template #extra>
            <HeaderBtns @click="(btn) => headerBtnOnClick({ headerBtn: btn, panel })" :btns="defaultHeaderBtns"/>
          </template>
          <BaseForm
            v-bind="defaultBaseFormProps"
            :data="panel.formData"
            :loading="false"
            @change="() => {}"
            :ref="el => drawerFormRefs[panel.ref] = el"
          />
        </a-collapse-panel>
      </a-collapse>  
    </a-drawer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";

  import BaseForm from "@components/BaseForm/index.vue";
  import TopBtns from "./TopBtns.vue";
  import HeaderBtns from "./HeaderBtns.vue";

  import type { DrawerProps } from "ant-design-vue";
  import type { BaseFormDrawerListType, DrawerClickDataType, AnyPropName } from "@types";
  import type { TopBtnType, TopBtnsType } from "./index.d";

  import { defaultProps, defaultBaseFormProps, defaultHeaderBtns } from "./const";

  const drawerFormRefs = ref<AnyPropName>({});

  interface PropsType extends DrawerProps {
    title?: string, // 弹窗标题
    data: BaseFormDrawerListType, // 数据源
    modelValue: boolean,
    topBtns?: TopBtnsType,
    placement?: DrawerProps["placement"],
    // collapseActiveKey?: string[] | string, // 折叠面板选中的key
    // confirmLoading?: boolean, // 确定按钮是否显示loading状态
    width?: number,
    loading?: boolean, // 是否加载中
    loadingTip?: string, // 自定义加载提示文案
    delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
    // colSpan?: number // 表单项一行占多少列 n/24
    // labelCol?: AnyPropName, // 表单项 label 配置; https://www.antdv.com/components/grid-cn/#Col
    // wrapperCol?: AnyPropName // 表单项 输入控件配置; 类型同 labelCol一致
  }

  interface Emits {
    (e: "update:modelValue", value: boolean): void;
    (e: "click", value: any): void;
    (e: "topClick", value: any): void;
    (e: "submit", data: AnyPropName): void;
  }

  const emits = defineEmits<Emits>();
  const props = withDefaults(defineProps<PropsType>(), { ...defaultProps });
  
  const { data, modelValue, topBtns } = toRefs(props);

  const _collapseActiveKey = ref<string[]>([]);
  setCollapseActives();

  // visible v-model 逻辑
  const _visible = ref(modelValue.value); // 初始化
  watch(_visible, value => emits("update:modelValue", value)); // 监听当前组件状态变化并通知父级
  watch(modelValue, value => _visible.value = value); // 监听父级变化并修改组件状态

  const onSubmitAll = async() => {
    const refKeys = data.value.map(v => v.ref);
    let submitData = {};
    for (let i = 0; i < refKeys.length; i++) {
      const currentData = await onSubmit(refKeys[i]);
      submitData = { ...submitData, ...currentData };
    }
    emits("submit", submitData);
  };

  const onClose = () => {
    _visible.value = false;
  };

  const topBtnOnClick = ({ value, ...args }: TopBtnType) => {
    if (value === "close") _visible.value = false;
    else if (value === "submit") onSubmitAll();
    else emits("topClick", { value, ...args });
  }

  const headerBtnOnClick = (v: any) => {
    const { headerBtn, panel } = v;
    const data: DrawerClickDataType = { key: panel.key, value: headerBtn.value, headerBtn, panel };
    emits("click", data);
  }

  async function onSubmit(refKey: string): Promise<object> {
    // 如果做了错误拦截那么获取数据之后需要判断数据是否存在 if (data) { code... }
    // const data = await drawerFormRefs.value[refKey]?.submit()
    //   .then((res: any) => res)
    //   .catch(() => undefined)
    const data = await drawerFormRefs.value[refKey]?.submit(); // 不做错误拦截时 调用端使用 await submit(refkey) 未通过表单校验时会报警告信息, 并且获取数据之后的代码会无法执行 Uncaught (in promise) 
    return data;
  }

  function setCollapseActives() {
    const keys: string[] = [];
    data.value.forEach(v => {
      if (v.collapsePanelActive) keys.push(v.key);
    })
    _collapseActiveKey.value = keys;
  }

  defineExpose({ submit: onSubmit });
</script>

<style lang="less">
  .drawer-collapse{
    background: #fff;
    border: 0;
    .ant-collapse-item {
      border: none;
    }
    .ant-collapse-content {
      border-top: none !important;
    }
    .ant-collapse-header {
      padding: 0 20px 0px 20px !important;
      border-radius: 0 !important;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center !important;
      height: 40px;
      line-height: 1 !important;;
      background: #f4f6f9;
      margin-bottom: 24px;
    }
    .ant-collapse-content-box {
      padding: 2px 0px 10px 0 !important;
    }
  }
</style>