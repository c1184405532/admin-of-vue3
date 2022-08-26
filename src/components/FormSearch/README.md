
# FormSearch 使用方法

## props 

  ### data
    表单数据 格式请参照 FormListDatas

  ### loading
    是否加载中

  ### loadingTip
    加载状态下文字

  ### delayTime
    延迟显示loading状态, 当loading状态在 delayTime 时间内结束, 则不显示loding UI状态 单位ms

  ### expand
    默认是否展开所有项

  ### showItemNum
    显示表单项个数, 超过折叠

  ### colSpan
    表单项一行占多少列 n/24 默认8

  ### labelCol
    表单项label配置, 同 antd 栅格 co l配置一致 https://www.antdv.com/components/grid-cn/#Col


## emits

  ### @change
    表单项内容变化回调

  ### @search
    点击查询按钮回调, 如表单校验失败则不触发

## ref Instance 组件实例方法; 传递参数和返回值请查看 FormSearchInstance

  ### searchRef.getFormState()
    获取表单数据

  ### searchRef.setFormState()
    设置表单数据

## 使用代码

```js
  <template>
    <FormSearch
      @change="formChange"
      @search="onSearch"
      :data="formList"
      :loading="loading"
      ref="formSearchRef"
    />
  </template>

  <script lang="ts" setup>
    import { ref } from "vue";
    import type { FormSearchInstance } from "@types";

    import FormSearch from "@components/FormSearch/index.vue";
    import { formList } from "./const";
    
    const formSearchRef = ref<FormSearchInstance>();
    const loading = ref(false);

    const formChange = (key: string, value: any): void => {
      console.log("formChange", key, value);
    }

    const onSearch = (values: any) => {
      console.log("onSearch", values);
    }
  </script>

```
