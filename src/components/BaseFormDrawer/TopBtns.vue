<template>
  <div class="btns-box">
    <a-button
      v-for="btn in btns"
      v-bind="btn"
      @click.stop="handClick(btn)"
      :key="btn.value"
      :type="btn.type"
      :size="btn.size"
      class="top-btn-box"
    >
      {{ btn.label }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from "vue";

  import type { TopBtnsType } from "./index.d";

  interface BtnsType {
    btns?: TopBtnsType
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
  .top-btn-box {
    margin-left: 16px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>