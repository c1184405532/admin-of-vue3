<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-tree-select
      v-model:value="selectValue"
      :filterTreeNode="filterOption"
      v-bind:="props.props"
      :treeData="props.options"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/tree-select-cn#API

  import { ref, watch, defineProps, defineEmits } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules", "options"]);

  const selectValue = ref(props.modelValue);

  watch(selectValue, (newv) => {
    emits("update:modelValue", newv);
  })

  watch(() => props.modelValue, (newv) => {
    selectValue.value = newv;
  })

  // 如果是自定义options结构，此处搜索会失效，需要添加额外逻辑
  const filterOption = (input: string, option: any) => {
    const labelMatch = option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const valueMatch = option?.value?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    return labelMatch || valueMatch;
  };
</script>