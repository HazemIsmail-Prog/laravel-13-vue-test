import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { isMobile } from "@/composables/windowSize"

export const useSidebarStore = defineStore('sidebar', () => {
    const isOpen = ref<boolean>(true)
    const sidebarWidth = ref(256)
    const durationSeconds = ref(0.15)

    watch(isOpen, (newVal: boolean) => {
        !isMobile.value && (isOpen.value = newVal)
    })

    watch(isMobile, () => {
        isOpen.value = !isMobile.value
    })

    return { isOpen, sidebarWidth, durationSeconds}
},{
    persist:{
        storage:localStorage,
        pick:['isOpen']
    }
})