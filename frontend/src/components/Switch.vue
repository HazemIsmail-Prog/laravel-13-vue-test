<script setup lang="ts">
import { computed } from 'vue'
import { CircleCheck } from '@lucide/vue'
import TransitionComponent from '@/components/TransitionComponent.vue'
const props = withDefaults(defineProps<{
    modelValue: boolean
    label: string
    transitionDuration?: number
}>(), {
    transitionDuration: 0.15
})

const emit = defineEmits(['update:modelValue'])

const switchValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
</script>

<template>
    <span 
        @click="switchValue = !switchValue" 
        class="select-none overflow-visible transition-all flex cursor-pointer items-center w-fit bg-secondary-background text-accent border rounded-full px-2 py-1 text-xs"
        :class="{ 
            'border-accent': modelValue,
            'border-border': !modelValue
        }"
        :style="{
            transitionDuration: transitionDuration + 's'
        }"
    >
        <TransitionComponent 
            :show="modelValue" 
            :height="10" 
            :width="19" 
            :durationSeconds="transitionDuration" 
            transissionMode="slide-h"
        >
            <CircleCheck class="me-[3px] rtl:translate-x-[0.5px] ltr:translate-x-[-0.5px] size-4 text-accent-text stroke-2 fill-accent" />
        </TransitionComponent>
        {{ label }}
    </span>
</template>