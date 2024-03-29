<template>
  <a-drawer
    v-bind="props"
    :visible="_visible"
    @close="onClose"
  >
    <template #extra>
      <TopBtns :btns="topBtns" @click="topBtnOnClick"/>
    </template>
    <a-spin :spinning="loading" :tip="loadingTip" :delay="delayTime">
      <a-collapse
        v-model:activeKey="_collapseActiveKey"
        expandIconPosition="right"
        class="drawer-collapse"
      >
        <a-collapse-panel v-for="panel in data" :header="panel.title" :key="panel.key">
          <template #extra>
            <HeaderBtns @click="(btn) => headerBtnOnClick({ headerBtn: btn, panel })" :btns="panel.headerBtns"/>
          </template>

          <BaseForm
            v-if="!panel.slots?.length"
            v-bind="panel.formProps || defaultBaseFormProps"
            :data="panel.formData"
            @change="(key, value) => baseFormChange({form: {key, value}, panel})"
            @click="(key, value) => baseFormClick({form: {key, value}, panel})"
            :ref="el => drawerFormRefs[panel.ref] = el"
          />
          <template v-else>
            <slot
              v-for="slot in panel.slots"
              :name="slot.name"
              v-bind="slot"
            />
          </template>
        </a-collapse-panel>
      </a-collapse>

      <Amap v-if="showAmap" v-model="visibleAmap" @submit="mapSubmit"/>
    </a-spin>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";

  import Amap from "@components/Amap/index.vue";
  import BaseForm from "@components/BaseForm/index.vue";
  import TopBtns from "./TopBtns.vue";
  import HeaderBtns from "./HeaderBtns.vue";

  import type { DrawerProps } from "ant-design-vue";
  import type { BaseFormDrawerListType, DrawerChangeDataType, DrawerClickDataType, AnyPropName, AampAddressType } from "@types";
  import type { TopBtnType, TopBtnsType } from "./index.d";

  import { defaultProps, defaultBaseFormProps } from "./const";

  interface PropsType extends DrawerProps {
    data: BaseFormDrawerListType, // 数据源
    modelValue: boolean,

    title?: string, // 弹窗标题
    topBtns?: TopBtnsType, // 顶部按钮组
    placement?: DrawerProps["placement"], // 抽屉出现的位置
    width?: number, // 抽屉宽度
    loading?: boolean, // 是否加载中
    loadingTip?: string, // 自定义加载提示文案
    delayTime?: number, // 延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms
  }

  interface Emits {
    (e: "update:modelValue", value: boolean): void;
    (e: "click", value: any): void; // panpel上的按钮点击
    (e: "change", value: any): void; // panpel上的表单元素发生改变时触发
    (e: "topClick", value: any): void; // 顶部按钮点击
    (e: "submit", data: AnyPropName): void; // 顶部按钮 value = submit 时触发该函数, 提交抽屉下所有表单数据
  }

  const emits = defineEmits<Emits>();
  const props = withDefaults(defineProps<PropsType>(), { ...defaultProps });
  const { data, modelValue, topBtns, loading, loadingTip, delayTime } = toRefs(props);

  const drawerFormRefs = ref<AnyPropName>({}); // 所有表单的ref集合 {key: formInstance}
  const _collapseActiveKey = ref<string[]>([]); // 设置展开的面板key
  setCollapseActives();

  const visibleAmap = ref(false);
  const showAmap = ref(false); // 检查数据源中是否需要加载地图
  checkShowAamp();

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

  const baseFormChange = (v: any) => {
    const { form, panel } = v;
    const data: DrawerChangeDataType = {key: form.key, value: form.value, form, panel};
    emits("change", data);
  }

  const currentRow = ref();
  const baseFormClick = ({ form, panel }: any) => {
    if (form?.key === "address" && !visibleAmap.value) {
      visibleAmap.value = true;
    }
    currentRow.value = {form, panel}; // 当前点击项数据
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
      if (v.collapsePanelActive !== false) keys.push(v.key);
    })
    _collapseActiveKey.value = keys;
  }

  function checkShowAamp() {
    let flag = false;
    data.value.forEach(v => {
      if (Array.isArray(v.formData)) {
        v.formData.forEach(formRow => {
          if (formRow.type === "address") flag = true;
        })
      }
    })
    showAmap.value = flag;
  }

  const mapSubmit = (address: AampAddressType) => {
    const { panel, form } = currentRow.value;
    if (panel?.ref) drawerFormRefs.value[panel.ref].setFormState(form.key, address); // 设置指定key下的表单值
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