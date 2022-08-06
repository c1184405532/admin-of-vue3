<template>
  <a-form-item
    :name="props.name"
    :label="props.label"
    :rules="props.rules"
  >
    <a-date-picker
      class="form-item-date-picker"
      v-model:value="dateValue"
      :format="dateFormat"
      :valueFormat="dateValueFormat"
      v-bind="props.props"
    />
  </a-form-item>
</template>

<script lang="ts" setup>

  // props.props 详细参数请查阅官方文档 https://antdv.com/components/date-picker-cn#API
  // format 显示的文本格式; valueFormat 实际值的格式

  import { ref, watch, defineProps, defineEmits, onBeforeMount } from "vue";
  
  const emits = defineEmits(["update:modelValue"]);
  const props = defineProps(["modelValue", "props", "name", "label", "rules", "options"]);

  const dateValue = ref(props.modelValue);
  const dateFormat = ref();
  const dateValueFormat = ref("YYYY-MM-DD");

  onBeforeMount(() => {
    const dateProps = props.props;
    console.log("dateProps", dateProps.picker);
    const formatMap:object = {
      "year": "YYYY-MM-DD",
      "quarter": "YYYY-[Q]Q",
      "month": "YYYY-MM",
      "week": "YYYY-ww[周]",
    }
    const formatValueMap:object = {
      "year": "YYYY-MM-DD",
      "quarter": "YYYY-MM",
      "month": "YYYY-MM",
      "week": "YYYY-MM-DD",
    }
    dateFormat.value = formatMap[dateProps.picker];
    dateValueFormat.value = formatValueMap[dateProps.picker];
  })

  watch(dateValue, (newv) => {
    emits("update:modelValue", newv);
  })

  watch(() => props.modelValue, (newv) => {
    dateValue.value = newv;
  })
</script>

<style lang="less" scoped>
  .form-item-date-picker{
    width: 100%;
  }
</style>