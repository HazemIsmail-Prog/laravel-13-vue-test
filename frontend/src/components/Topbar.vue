<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
const sidebar = useSidebarStore()
import { PanelRightOpen } from '@lucide/vue'
</script>

<template>
    <header class="p-4 bg-background shadow flex items-center gap-4">
        <button @click="sidebar.isOpen = !sidebar.isOpen" class="text-text-muted hover:text-text">
            <PanelRightOpen 
                class="size-5 stroke-1 text-accent hover:text-accent/80 transition-all"
                :class=" !sidebar.isOpen ? 'rtl:rotate-0 ltr:rotate-180' : 'rtl:rotate-180 ltr:rotate-0'"
                :style="{ transitionDuration: sidebar.durationSeconds + 's' }"
            />
        </button>
        <div class="flex-1 text-text font-semibold">
            <slot />
        </div>
    </header>
</template>