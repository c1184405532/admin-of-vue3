<template>
  <template v-for="v in props.list">
    <a-menu-item v-if="!v.children" :key="v.title">
      <span>{{ v.title }}</span>
    </a-menu-item>
    <a-sub-menu v-if="v.children" :key="v.title">
      <template #title>
        <span>
          <span>{{ v.title }}</span>
        </span>
      </template>
      <SubMenuTree :list="v.children"/>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    list: {title: string, children: []}[]
  }>()
</script>

