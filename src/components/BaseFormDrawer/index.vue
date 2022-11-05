<template>
  <a-spin :spinning="loading" :tip="loadingTip" :delay="delayTime">
    <a-drawer
      v-bind="props"
      :placement="placement"
      :visible="_visible"
      @close="onClose"
    >
      <template #extra>
        <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </template>
      <a-collapse
        v-model:activeKey="_collapseActiveKey"
        expandIconPosition="right"
        class="drawer-collapse"
      >
        <a-collapse-panel class="drawer-collapse-panel" key="1" header="This is panel header 1">
          <span style="line-height: 1; font-size: 20px;">行级元素</span>
          <div style="line-height: 1; font-size: 20px;">块级元素</div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-collapse-panel>
      </a-collapse>  
    </a-drawer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";
  import type { DrawerProps } from "ant-design-vue";
  import { defaultProps } from "./const";

  const placement = ref<DrawerProps["placement"]>("right");

  interface PropsType extends DrawerProps {
    title?: string, // 弹窗标题
    // data: FormListDatas, // 数据源
    modelValue: boolean,
    collapseActiveKey?: string[] | string, // 折叠面板选中的key
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
    // (e: "formChange", key: string, value: any): void;
    // (e: "submit", data: AnyPropName): void;
  }

  const emits = defineEmits<Emits>();
  const props = withDefaults(defineProps<PropsType>(), { ...defaultProps });
  console.log("props", props.width);
  
  const { modelValue, collapseActiveKey } = toRefs(props);

  const _collapseActiveKey = ref(collapseActiveKey.value);

  // visible v-model 逻辑
  const _visible = ref(modelValue.value); // 初始化
  watch(_visible, value => emits("update:modelValue", value)); // 监听当前组件状态变化并通知父级
  watch(modelValue, value => _visible.value = value); // 监听父级变化并修改组件状态

  const onSubmit = () => {
    // visible.value = true;
  };

  const onClose = () => {
    _visible.value = false;
  };
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