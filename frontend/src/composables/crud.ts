import { ref, onMounted } from 'vue'
import axiosInstance from '@/lib/axios'

export const useCrud = <T extends { id: number }>(url: string) => {
    const modalIsOpen = ref(false)
    const records = ref<T[]>([])
    const selectedRecord = ref<T | null>(null)
    const recordsTotal = ref(0)
    const nextPageUrl = ref<string | null>(null)
    const loadingMore = ref(false)
    const fetchingRecords = ref(false)
    const isSubmitting = ref(false)
    const formErrors = ref<any>({})
    
    onMounted(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal()
            }
            if (event.key === 'ArrowDown') {
                if (selectedRecord.value) {
                    const index = records.value.findIndex(r => r.id === selectedRecord.value?.id)
                    if (index < records.value.length - 1) {
                        selectedRecord.value = records.value[index + 1]
                    }
                }
            }
            if (event.key === 'ArrowUp') {
                if (selectedRecord.value) {
                    const index = records.value.findIndex(r => r.id === selectedRecord.value?.id)
                    if (index > 0) {
                        selectedRecord.value = records.value[index - 1]
                    }
                }
            }
        })
        getRecords()
    })

    const loadMoreRecords = async (params: any = {}) => {
        if (!nextPageUrl.value) {
            return
        }

        loadingMore.value = true

        try {
            const response = await axiosInstance.get(nextPageUrl.value, { params })
            records.value.push(...response.data.data)
            nextPageUrl.value = response.data.next_page_url
        } catch (error) {
            console.error(error)
        } finally {
            loadingMore.value = false
        }
    }

    const openModal = (record: T | null) => {
        formErrors.value = {}
        if (record && record?.id === selectedRecord.value?.id) {
            selectedRecord.value = null
            modalIsOpen.value = false
            return
        }
        selectedRecord.value = record
        modalIsOpen.value = true
    }

    const closeModal = () => {
        modalIsOpen.value = false
        selectedRecord.value = null
    }

    const getRecords = async (params: any = {}) => {
        fetchingRecords.value = true
        try {
            const response = await axiosInstance.get(url, { params })
            records.value = response.data.data
            recordsTotal.value = response.data.total
            nextPageUrl.value = response.data.next_page_url
        } catch (error) {
            console.error(error)
        } finally {
            fetchingRecords.value = false
        }
    }


    const createRecord = async (payload: any) => {
        isSubmitting.value = true
        try {
            const response = await axiosInstance.post(url, payload)
            records.value.unshift(response.data)
            recordsTotal.value++
            closeModal()
        } catch (error: any) {
            formErrors.value = error.response.data.errors
            console.error(error)
        } finally {
            isSubmitting.value = false
        }
    }

    const updateRecord = async (payload: any) => {
        isSubmitting.value = true
        try {
            const response = await axiosInstance.put(`${url}/${payload.id}`, payload)
            records.value = records.value.map(r => r.id === payload.id ? response.data : r)
            closeModal()
        } catch (error: any) {
            formErrors.value = error.response.data.errors
            console.error(error)
        } finally {
            isSubmitting.value = false
        }
    }

    const deleteRecord = async (id: number) => {
        try {
            await axiosInstance.delete(`${url}/${id}`)
            records.value = records.value.filter(r => r.id !== id)
            recordsTotal.value--
            if (selectedRecord.value?.id === id) {
                closeModal()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { 
        modalIsOpen,
        records, 
        selectedRecord, 
        recordsTotal,
        nextPageUrl,
        loadingMore,
        isSubmitting,
        fetchingRecords,
        formErrors,
        getRecords, 
        openModal, 
        closeModal,
        createRecord,
        updateRecord,
        deleteRecord,
        loadMoreRecords,
    }
}