
# BaseFormModal 使用方法

## props 
  全部参数前往官网API https://www.antdv.com/components/modal-cn#API

  ### data
    表单数据 格式请参照 FormListDatas

  ### modelValue
    v-model 值

  ### title
    弹窗标题, 可根据业务逻辑修改,或动态修改

  ### width
    弹窗宽度

  ### loading
    当前是否需要加载状态

  ### loadingTip
    自定义加载状态下文字

  ### confirmLoading
    确认按钮loading

  ### delayTime
    延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms

  ### colSpan
    表单项一行占多少列 n/24 默认24

  ### labelCol
    表单项label配置, 同 antd 栅格 co l配置一致 https://www.antdv.com/components/grid-cn/#Col

  ### wrapperCol
    表单项内容配置 同 labelCol 类型一致

## emits

  ### @formChange
    表单项内容变化回调

  ### @submit
    点击确认按钮回调, 如表单校验失败则不触发

## ref Instance 组件实例方法; 传递参数和返回值请查看 BaseFormModalInstance

  ### modalRef.getFormState()
    获取表单数据

  ### modalRef.setFormState()
    设置表单数据

  ### modalRef.resetFields()
    重置表单数据

## 使用代码

```js
  <template>
    <BaseFormModal
      v-model="baseFormModalVisible"
      @formChange="formChange"
      @submit="modalSubmit"
      :loading="modalLoading"
      :data="formList"
      title="标题"
      ref="baseFormModalRef"
    />
  </template>

  <script lang="ts" setup>
    import { ref } from "vue";
    import type { BaseFormModalInstance } from "@types";
    import BaseFormModal from "@components/BaseFormModal/index.vue";
    import { formList } from "./const";
    
    const baseFormModalRef = ref<BaseFormModalInstance>();
    const baseFormModalVisible = ref(false);
    const modalConfirmLoading = ref(false);
    const modalLoading = ref(false);

    const formChange = (key: string, value: any): void => {
      console.log("formChange", key, value);
    }

    const modalSubmit = (data: any) => {
      console.log("modalSubmit", data);
      if (data) {
        modalConfirmLoading.value = true;
        // your code...

        setTimeout(() => {
          modalConfirmLoading.value = false;
          baseFormModalVisible.value = false;
        }, 1000);
      }
    }
  </script>

```
