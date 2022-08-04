<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-select
      v-model:value="selectValue"
      v-bind:="props.props"
      :options="props.options"
      :filterOption="props.props.filterOption || filterOption"
    />
  </a-form-item>
</template>

<script lang="ts" setup>
  import { ref, watch, defineProps, defineEmits } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules", "options"]);

  const selectValue = ref(props.modelValue);

  watch(selectValue, (newv) => {
    emits("update:modelValue", newv)
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