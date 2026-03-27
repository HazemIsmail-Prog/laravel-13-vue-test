<script setup lang="ts">
import { ref } from 'vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import TransisionComponent from '@/components/TransitionComponent.vue'
import { Settings } from '@lucide/vue'
const expanded = ref(false)

const onPointerEnter = (event: PointerEvent) => {
  if (event.pointerType === 'mouse') {
    expanded.value = true
  }
}

const onPointerLeave = (event: PointerEvent) => {
  if (event.pointerType === 'mouse') {
    expanded.value = false
  }
}

</script>

<template>
    <div 
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        class="flex flex-col"
    >
        <TransisionComponent 
            :show="expanded" 
            :height="170" 
            :width="170"
            :durationSeconds="0.15" 
            transissionMode="slide-v"
        >
            <div
                v-if="expanded"
            >
                <div class="p-2 mb-2 flex flex-col gap-2 border border-border rounded-md">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>
        </TransisionComponent>

        <div class="flex items-center justify-between gap-2 bg-secondary-background rounded p-2" @click="expanded = !expanded">
            <h1 class="text-sm text-text-muted font-bold">{{ $t('Settings') }}</h1>
            <Settings class="size-4 text-text-muted hover:text-text" />
        </div>

    </div>
</template>