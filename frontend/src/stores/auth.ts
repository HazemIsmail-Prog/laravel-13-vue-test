import router from "@/router"
import axiosInstance from "@/lib/axios"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { LoginForm, User } from "@/types"

export const useAuthStore = defineStore('auth', () => {
    
    const user = ref<User | null>(null)
    const loading = ref(false)
    const authError = ref<any | null>(null)
    const isAuthenticated = computed(() => user.value !== null && localStorage.getItem('token') !== null)

    const getUser = async () => {
        if (!localStorage.getItem('token')) {
            return
        }
        try {
            const response = await axiosInstance.get('/api/user')
            user.value = response.data
            authError.value = null
        } catch (error: any) {
            if (error.response.status === 401) {
                user.value = null
                localStorage.removeItem('token')
                console.log('user not authenticated')
            }
            authError.value = error.response.data
        }
    }

    const login = async (payload: LoginForm) => {
        try {
            loading.value = true
            const response = await axiosInstance.post('/api/login', payload)
            localStorage.setItem('token', response.data)
            authError.value = null
            router.push({ name: 'dashboard' })
        } catch (error: any) {
            authError.value = error.response.data
            localStorage.removeItem('token')
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        try {
            loading.value = true
            await axiosInstance.post('/api/logout')
            router.push({ name: 'login' })
        } finally {
            loading.value = false
            user.value = null
            localStorage.removeItem('token')       
        }
    }

    return { login, logout, loading, authError, user, getUser, isAuthenticated }
},{
    persist:{
        storage:localStorage,
        pick:['user']
    }
})