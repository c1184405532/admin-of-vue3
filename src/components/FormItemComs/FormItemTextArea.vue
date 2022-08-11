<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-textarea
      v-model:value="inputValue"
      v-bind="props.props"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档（TextArea） https://antdv.com/components/input-cn/#API

  import { ref, watch } from "vue";
  
  const emits = defineEmits(["update:modelValue", "change"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules"]);

  const inputValue = ref(props.modelValue);

  watch(inputValue, (newv) => {
    emits("update:modelValue", newv);
    // emits("change",newv, props.name)
  })

  watch(() => props.modelValue, (newv) => {
    inputValue.value = newv;
  })
</script>
