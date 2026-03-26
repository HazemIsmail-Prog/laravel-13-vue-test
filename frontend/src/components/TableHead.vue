<script setup lang="ts">
defineProps<{
    label?: string
}>()
</script>

<template>
    <th class="px-4 py-2 text-start text-xs uppercase tracking-wider text-accent border-b border-border font-normal">
        <slot>{{ label }}</slot>
    </th>
</template>