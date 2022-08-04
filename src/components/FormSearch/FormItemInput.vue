<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-input
      v-model:value="inputValue"
      v-bind:="props.props"
    ></a-input>
  </a-form-item>
</template>

<script lang="ts" setup>
  import { ref, watch, defineProps, defineEmits } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules"]);

  const inputValue = ref(props.modelValue);

  watch(inputValue, (newv) => {
    emits("update:modelValue", newv)
  })

  watch(() => props.modelValue, (newv) => {
    inputValue.value = newv;
  })
</script>