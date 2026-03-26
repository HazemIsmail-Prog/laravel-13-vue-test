<script setup lang="ts">
const props = defineProps<{
    for?: string[] | undefined
}>()
</script>

<template>
    <div v-if="Array.isArray(props.for) && props.for.length" class="text-danger text-sm mt-1">
        {{ props.for[0] }}
    </div>
</template>