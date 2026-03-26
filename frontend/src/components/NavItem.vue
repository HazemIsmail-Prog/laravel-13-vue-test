<script setup lang="ts">
import type { Component } from 'vue'
defineProps<{
    label: string
    icon?: Component
    isActive?: boolean
}>()
</script>

<template>
    <button
        :class="[
            'w-full flex text-sm items-center gap-2 px-3 py-1.5 rounded transition',
            isActive
                ? 'bg-accent/10 border-s-5 border-accent text-accent'
                : 'text-text-muted hover:bg-secondary-background'
            ]"
        >
            <component 
                v-if="icon" 
                :is="icon" 
                class="size-4 stroke-1 shrink-0" 
                :class="isActive ? 'text-accent' : 'text-text-muted'"
            />
            <slot>{{ label }}</slot>
        </button>
</template>