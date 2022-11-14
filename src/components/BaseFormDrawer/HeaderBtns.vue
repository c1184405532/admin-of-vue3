<template>
  <div class="btns-box">
    <a-button
      v-for="btn in btns"
      v-bind="btn"
      @click.stop="handClick(btn)"
      :key="btn.value"
      :type="btn.type || `default`"
      :size="btn.size || `small`"
      class="header-btn-box"
    >
      {{ btn.label }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from "vue";

  import type { HeaderBtnsType } from "@/types/index";

  interface BtnsType {
    btns?: HeaderBtnsType
  }

  interface BtnsEmits {
    (e: "click", value: any): void,
  }

  const props = defineProps<BtnsType>()
  const { btns } = toRefs(props);

  const emits = defineEmits<BtnsEmits>();
  const handClick = (btn: any) => {
    emits("click", btn);
  }
  
</script>

<style lang="less" scoped>
.btns-box{
  margin-right: 24px;
  .header-btn-box {
    margin-left: 10px;
    font-size: 12px;
    // color: #4285f4;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>