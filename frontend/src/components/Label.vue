<script setup lang="ts">
defineProps<{
    for?: string
    text: string
}>()
</script>

<template>
    <label :for="for" class="block text-sm font-medium text-text-muted select-none">
        <slot>{{ text }}</slot>
    </label>
</template>