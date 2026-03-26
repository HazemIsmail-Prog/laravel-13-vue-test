<script setup lang="ts">
import SidebarLayout from '../layouts/SidebarLayout.vue'
import { useTabTitle } from '@/composables/tabTitle'
useTabTitle('About')
</script>

<template>
  <SidebarLayout>
    <template #header>
      <h1>{{ $t('About') }}</h1>
    </template>
    <p>This is the about page</p>
  </SidebarLayout>
</template>
