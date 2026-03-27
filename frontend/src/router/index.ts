import { createRouter, createWebHistory } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { isMobile } from '@/composables/windowSize'
import { routes } from './routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach(async (to) => {
  const auth = useAuthStore()
  await auth.getUser()
  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' }
  } else if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  } else {
    const sidebar = useSidebarStore()
    if (isMobile.value) {
      sidebar.isOpen = false
    }
    return true
  }
})  
export default router
