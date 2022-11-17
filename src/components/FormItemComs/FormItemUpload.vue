<template>
  <a-form-item
    v-bind="props.formItemProps"
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-upload
      v-model:file-list="_fileList"
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      v-bind="props.props"
      @change="fileChange"
    >
      <a-button>
        <UploadOutlined/>
        {{ props?.props?.placeholder || "Click to Upload" }}
      </a-button>
    </a-upload>
  </a-form-item>
</template>

<script lang="ts" setup>
  // !!! 上传组件只是模拟拿到文件流和表单校验的功能, 真正要使用需要自行对接公司内部上传方式或阿里云OSS等。
  // 如需定义文件选择类型 请查看官方文档的 accept 字段

  // props.props 详细参数请查阅官方文档 https://www.antdv.com/components/upload-cn#API
  import { ref, watch } from "vue";

  import { UploadOutlined } from "@ant-design/icons-vue"
  import type { FormItemProps as AntFormItemProps, UploadChangeParam } from "ant-design-vue";
  import type { AnyPropName } from "@/types";

  import { useChange } from "./useFormItem";
  import { formItemDefaultProps } from "./const";
  
  interface FormItemEmits {
    (e: "update:modelValue", value: any): void,
    (e: "onChange", value: any, key: string): void,
  }

  // vue3 当前版本暂不支持外部导入props类型定义 wait fix
  interface FormItemProps {
    modelValue: any, // v-model响应值
    name: string, // 数据键
    label: string, // 表单项文本名
    rules?: Array<AnyPropName>, // 校验规则 同antd 表单校验规则一致
    props?: AnyPropName, // 组件额外 props 同antd组件props一致
    formItemProps?: AntFormItemProps, // a-form-item props
    change?: (value: any, key: string) => void, // 当前项值变化时触发
  }
  
  const emits = defineEmits<FormItemEmits>();
  const props = withDefaults(defineProps<FormItemProps>(), {...formItemDefaultProps});

  const _fileList = ref(props.modelValue || []);

  watch(_fileList, value => { // 文件内容会在上传时触发多次改变, 需根据公司内部上传方式, 判断什么时候触发change事件, 思路: 可在fileChange中判断状态并调用 useChange
    useChange(emits, props, value);
  })

  watch(() => props.modelValue, value => {
    _fileList.value = value;
  })

  const fileChange = ({ file, fileList }: UploadChangeParam) => {
    if (file.status === "done") { // antdv 提供的文件上传地址有时可能上传成功有时会失败, 个人猜测与文件大小有关或该地址设置了随机数成功或失败. 并且上传成功后返回的url也不是你传递的文件
      const res = file.response;
      _fileList.value = fileList.map(v => ({ ...v, url: res?.url }));
    }
  }
</script>