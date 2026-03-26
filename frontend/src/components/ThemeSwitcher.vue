<script setup lang="ts">
import { ref, inject } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import Button from './Button.vue'

const mode = inject('mode')
const themeButtons = ref([
    {
        icon: Sun,
        value: 'light'
    },
    {
        icon: Moon,
        value: 'dark'
    },
])
</script>

<template>
    <div class="flex flex-col gap-2">
        <h1 class="text-sm text-text-muted font-bold">{{ $t('Theme') }}</h1>
        <div class="flex items-center p-1 bg-secondary-background rounded">
            <Button v-for="button in themeButtons" :key="button.value"
                class="w-full py-2"
                @click="mode = button.value as 'light' | 'dark' | 'auto'"
                :leadingIcon="button.icon"
                :variant="mode === button.value ? 'accent' : 'ghost'"
            />
        </div>
    </div>
</template>