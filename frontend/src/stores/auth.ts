import router from "@/router"
import axiosInstance from "@/lib/axios"
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { LoginForm, User } from "@/types"

export const useAuthStore = defineStore('auth', () => {
    
    const user = ref<User | null>(null)
    const loading = ref(false)
    const authError = ref<any | null>(null)
    const authChecked = ref(false)
    const isAuthenticated = computed(() => user.value !== null && authChecked.value)

    const getUser = async () => {
        if (!authChecked.value) {
            return
        }
        try {
            const response = await axiosInstance.get('/api/user')
            user.value = response.data
            authError.value = null
        } catch (error: any) {
            if (error.response.status === 401) {
                user.value = null
                authChecked.value = false
                console.log('user not authenticated')
            }
            authError.value = error.response.data
        }
    }

    const login = async (payload: LoginForm) => {
        try {
            loading.value = true
            await axiosInstance.get('/sanctum/csrf-cookie')
            const response = await axiosInstance.post('/api/login', payload)
            user.value = response.data
            authError.value = null
            router.push({ name: 'dashboard' })
        } catch (error: any) {
            authError.value = error.response.data
        } finally {
            loading.value = false
            authChecked.value = true
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
            authChecked.value = false            
        }
    }

    return { login, logout, loading, authError,authChecked, user, getUser, isAuthenticated }
},{
    persist:{
        storage:localStorage,
        pick:['authChecked','user']
    }
})