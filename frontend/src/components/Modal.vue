<script setup lang="ts">
import TransisionComponent from '@/components/TransitionComponent.vue'
import { computed } from 'vue'
import { isMobile, width } from '@/composables/windowSize'
const props = withDefaults(defineProps<{
    isOpen: boolean
    dismissible?: boolean
    width?: number
    durationSeconds?: number
}>(), {
    dismissible: true,
    width: 350,
    durationSeconds: 0.15
})

const emit = defineEmits<{
    (e: 'close'): void
}>()

const modalWidth = computed(() => {
    return isMobile.value ? width.value : props.width
})

const handleOverlayClick = () => {
    if (props.dismissible && props.isOpen) {
        emit('close')
    }
}
</script>

<template>

    <Teleport defer to="#modal-sidebar">
        <!-- <div 
            @click="handleOverlayClick" 
            class="bg-black/50 md:hidden absolute inset-0 transition-all"
            :class="{ 
                'opacity-0 -z-10': !isOpen,
                'opacity-100 z-60': isOpen
            }"
            :style="{ transitionDuration: durationSeconds / 2 + 's' }"
        ></div> -->


        <TransisionComponent 
            :show="isOpen" 
            :height="0" 
            :width="modalWidth"
            :durationSeconds=durationSeconds
            transissionMode="slide-h"
            class="fixed top-0 end-0 z-70 md:relative" 
        >


            <aside 
                class="h-dvh p-3 bg-background shadow flex flex-col border-s md:border-none border-border" 
                :style="{ width: modalWidth + 'px'}"
            >
                <slot />
            </aside>

        </TransisionComponent>
    </Teleport>

</template>