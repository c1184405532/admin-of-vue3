<template>
  <template v-for="v in props.list">
    <a-menu-item v-if="!v.children" :key="v.name">
      <span>{{ v.title }}</span>
    </a-menu-item>
    <a-sub-menu v-if="v.children" :key="v.name">
      <template #title>
        <span>
          <span>{{ v.title }}</span>
        </span>
      </template>
      <SubMenuTree :list="v.children" />
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>

import { RouteRecordRawType } from "@/router/types";
const props = defineProps<{
  list: RouteRecordRawType[];
}>();

</script>
