<script setup lang="ts">
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import { useTabTitle } from '@/composables/tabTitle'
useTabTitle('Dashboard')

</script>

<template>
    <SidebarLayout>
        <template #header>
            <h1>{{ $t('Dashboard') }}</h1>
        </template>
        <p>This is the dashboard page</p>
    </SidebarLayout>
</template>