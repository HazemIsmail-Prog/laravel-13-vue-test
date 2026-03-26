<script setup lang="ts">
import { computed, type Component } from 'vue'

const props = defineProps<{
    type?: string
    id?: string
    modelValue?: string | number
    leadingIcon?: Component
    trailingText?: string
    placeholder?: string
    class?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
</script>

<template>
    <div class="relative">

        <component 
            :is="leadingIcon" 
            v-if="leadingIcon" 
            class="absolute mt-0.5 top-1/2 -translate-y-1/2 start-3 size-4 text-accent"
        />

        <input
            :type="type"
            :id="id"
            v-model="inputValue"
            class="mt-1 text-sm text-text-muted bg-secondary-background border-border border-2 selection:bg-accent/40 selection:text-text p-2 w-full rounded focus:bg-accent/10 focus:text-text focus:border-border focus:outline-none focus:ring-accent/40 focus:ring-3 transition-all duration-300"
            :class="[props.class, { 'ps-10': leadingIcon, 'pe-24': trailingText }]"
            :placeholder="placeholder"
        >

        <p 
            v-if="trailingText" 
            class="absolute mt-0.5 top-1/2 -translate-y-1/2 end-3 text-xs text-accent"
        >{{ trailingText }}</p>
        
    </div>
</template>