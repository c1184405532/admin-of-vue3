<template>
  <div class="btns-box">
    <a-button class="btn"
      v-for="btn in btns"
      v-bind="btn"
      @click="handClick(btn)"
      :key="btn.value"
    >
      {{ btn.label }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from "vue";

  import type { HeaderBtnsType } from "./types";
  import { defaultHeaderBtns } from "./const";

  interface BtnsType {
    btns?: HeaderBtnsType
  }

  interface BtnsEmits {
    (e: "click", value: any): void,
  }

  const props = withDefaults(defineProps<BtnsType>(), { ...defaultHeaderBtns });
  const { btns } = toRefs(props);



  const emits = defineEmits<BtnsEmits>();

  const handClick = (btn: any) => {
    emits("click", btn);
  }
  
</script>

<style lang="less">
.btns-box{
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 12px 0;
  margin-left: -10px;
  .btn{
    margin-left: 10px;
  }
}
</style>