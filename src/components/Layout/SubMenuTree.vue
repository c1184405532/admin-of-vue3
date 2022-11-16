<template>
  <template v-for="v in props.list">
    <a-menu-item v-if="!v.children" :key="v.name">
      <span>{{ v.meta?.title }}</span>
    </a-menu-item>
    <a-sub-menu v-if="v.children" :key="v.name">
      <template #title>
        <span>
          <span>{{ v.meta?.title }}</span>
        </span>
      </template>
      <SubMenuTree :list="v.children" />
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>

import type { RouteRecordRaw } from "vue-router";
const props = defineProps<{
  list: RouteRecordRaw[];
}>();

</script>
