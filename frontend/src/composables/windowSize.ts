import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const { width } = useWindowSize()

export const isMobile = computed(() => width.value < 768)