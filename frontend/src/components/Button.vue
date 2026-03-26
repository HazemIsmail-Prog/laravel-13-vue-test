<script setup lang="ts">
import { computed, type Component } from 'vue'
import { LoaderCircle } from '@lucide/vue';
import type { ButtonVariant } from '@/types';
const props = withDefaults(defineProps<{
    label?: string
    type?: 'button' | 'submit'
    leadingIcon?: Component
    trailingIcon?: Component
    processing?: boolean
    variant?: ButtonVariant
    rounded?: boolean
}>(), {
    variant: 'accent',
    type: 'button',
    processing: false,
    rounded: true
})
const variantClasses = computed(() => {
    let baseClasses = ['text-sm font-normal flex justify-center items-center gap-2 px-3 py-1.5 disabled:opacity-50']
    if (props.rounded) {
        baseClasses.push('rounded')
    }
    switch (props.variant) {
        case 'accent':
            baseClasses.push('bg-accent hover:bg-accent/80 text-accent-text')
            break
        case 'secondary':
            baseClasses.push('bg-gray-500')
            break
        case 'danger':
            baseClasses.push('bg-danger hover:bg-danger/80 text-danger-text')
            break
        case 'warning':
            baseClasses.push('bg-warning')
            break
        case 'info':
            baseClasses.push('bg-info')
            break
        case 'success':
            baseClasses.push('bg-success')
            break
        case 'link':
            baseClasses.push('bg-transparent')
            break
        case 'outline':
            baseClasses.push('border border-blue-500')
            break
        case 'ghost':
            baseClasses.push('bg-transparent text-text-muted hover:text-text')
            break
        case 'text':
            baseClasses.push('text-blue-500')
            break
    }
    return baseClasses.join(' ')
    
})
</script>

<template>
    <button 
        :type="type" 
        :class="variantClasses"
        :disabled="processing"
    >
    <!-- scale-x-[-1] is for rtl languages to flip the icon -->
    <component :is="leadingIcon" v-if="leadingIcon && !processing" class="h-4 w-4 rtl:scale-x-[-1]" />
    <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
    <slot>{{ label }}</slot>
    <!-- scale-x-[-1] is for rtl languages to flip the icon -->
    <component :is="trailingIcon" v-if="trailingIcon && !processing" class="h-4 w-4 rtl:scale-x-[-1]" />
    </button>
</template>