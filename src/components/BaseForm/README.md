
# BaseForm 使用方法

## props 
  全部参数前往官网API https://www.antdv.com/components/form-cn#API

  ### data
    表单数据 格式请参照 FormListDatas

  ### loading
    当前是否需要加载状态

  ### loadingTip
    自定义加载状态下文字

  ### delayTime
    延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms

  ### colSpan
    表单项一行占多少列 n/24 默认24

  ### labelCol
    表单项label配置, 同 antd 栅格 co l配置一致 https://www.antdv.com/components/grid-cn/#Col

  ### wrapperCol
    表单项内容配置 同 labelCol 类型一致

## emits

  ### @change
    表单项内容变化回调

## ref Instance 组件实例方法; 传递参数和返回值请查看 BaseFormInstance

  ### formRef.getFormState()
    获取表单数据

  ### formRef.setFormState()
    设置表单数据

  ### formRef.resetFields()
    重置表单数据

  ### formRef.submit()
    提交表单

## 使用代码

```js
  <template>
    <BaseForm
      :data="formList"
      :loading="loading"
      @change="formChange"
      ref="baseFormRef"
    />
  </template>

  <script lang="ts" setup>
    import { ref } from "vue";
    import type { BaseFormInstance } from "@types";
    import BaseForm from "@components/BaseForm/index.vue";
    import { formList } from "./const";
    
    const baseFormRef = ref<BaseFormInstance>();
    const loading = ref(false);

    const formChange = (key: string, value: any): void => {
      console.log("formChange", key, value);
    }
  </script>

```
