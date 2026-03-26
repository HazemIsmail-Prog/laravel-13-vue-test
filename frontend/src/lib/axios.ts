import router from '@/router'
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 403) {
            router.replace({ name: 'unauthorized' })
        }
        return Promise.reject(error)
    }
)

export default axiosInstance