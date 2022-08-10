<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-input
      v-model:value="inputValue"
      v-bind="props.props"
    ></a-input>
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/input-cn/#API

  import { ref, watch } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules"]);

  const inputValue = ref(props.modelValue);

  watch(inputValue, (newv) => {
    emits("update:modelValue", newv);
  })

  watch(() => props.modelValue, (newv) => {
    inputValue.value = newv;
  })
</script>