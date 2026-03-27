<script setup lang="ts">
import { useTranslateBackend } from '@/composables/translateBackend'
import { provide, useTemplateRef, ref, watch } from 'vue'
import SidebarLayout from '@/layouts/SidebarLayout.vue'
import { useIntersectionObserver } from '@vueuse/core'
import TableCell from '@/components/TableCell.vue'
import TableHead from '@/components/TableHead.vue'
import { Plus, Trash, Search, X, Check } from '@lucide/vue'
import { useCrud } from '@/composables/crud'
import Button from '@/components/Button.vue'
import { refDebounced } from '@vueuse/core'
import Input from '@/components/Input.vue'
import UsersForm from './UsersForm.vue'
import type { User } from '@/types'
import Spinner from '@/components/Spinner.vue'
import { useTabTitle } from '@/composables/tabTitle'
import TransitionComponent from '@/components/TransitionComponent.vue'

useTabTitle('Users')
const { translated } = useTranslateBackend()
const crud = useCrud<User>('/api/users')
const { 
    records, 
    modalIsOpen,
    nextPageUrl, 
    loadingMore, 
    recordsTotal, 
    selectedRecord, 
    fetchingRecords,
    openModal, 
    getRecords, 
    deleteRecord, 
    loadMoreRecords,
} = crud

const loadMoreTarget = useTemplateRef('loadMoreTarget')
const targetIsVisible = ref(false)
const confirmDelete = ref<number | null>(null)

const search = ref('')
const debouncedSearch = refDebounced(search, 500)
const filters = ref({
    search: '',
    isActive: 'all',
})

watch(debouncedSearch, () => {
    filters.value.search = debouncedSearch.value
})

watch(filters, () => {
    getRecords(filters.value)
}, { deep: true })

provide('sharedCrud', crud)

useIntersectionObserver(
    loadMoreTarget,
    ([entry]) => {
        targetIsVisible.value = entry?.isIntersecting || false
        if (targetIsVisible.value) {
            loadMoreRecords(filters.value)
        }
    },
)



</script>

<template>

    <UsersForm />

    <SidebarLayout>

        <template #header>
            <div class="flex justify-between items-center h-[32px]">
                <h1>{{ $t('Users') }}</h1>
                <TransitionComponent :show="!modalIsOpen" :height="0" :width="140" :durationSeconds="0.15" transissionMode="slide-h">
                    <Button
                    class="whitespace-nowrap w-[140px]"
                    :leadingIcon="Plus"
                    :label="$t('Add New User')" 
                    @click="openModal(null)"
                    />
                </TransitionComponent>
            </div>
        </template>

        <div class="p-2">
            <Input 
                type="search"
                :leadingIcon="Search" 
                v-model="search" 
                :placeholder="$t('Search...')"
                :trailingText="`${recordsTotal} ${$t('Records')}`"
            />
        </div>

        <div v-if="records.length === 0 && !fetchingRecords" class="py-16 text-center text-lg">
            {{ $t('No records found.') }}
        </div>

        <div v-if="fetchingRecords" class="flex justify-center py-16">
            <Spinner />
        </div>

        <div v-if="records.length > 0 && !fetchingRecords" class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <TableHead :label="$t('Name')" />
                        <TableHead :label="$t('Email')" />
                        <TableHead />
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        @click="openModal(user)" 
                        v-for="user in records" 
                        :key="user.id"
                        class="cursor-pointer transition-all hover:bg-hover text-text-muted"
                        :class="{ 'bg-accent/10 border-s-5 border-accent !text-accent': user.id === selectedRecord?.id }"
                    >
                        <TableCell>{{ translated(user.name) }}</TableCell>
                        <TableCell>{{ user.email }}</TableCell>
                        <TableCell>
                            <div class="flex justify-end">
                                <Button
                                    v-if="confirmDelete !== user.id"
                                    :leadingIcon="Trash" 
                                    @click.stop="confirmDelete = user.id"
                                    variant="ghost"
                                    class="!text-danger"
                                />
                                <div class="flex gap-2" v-if="confirmDelete === user.id">
                                    <Button
                                        :leadingIcon="Check"
                                        @click.stop="deleteRecord(user.id)"
                                        variant="danger"
                                        />
                                    <Button
                                        :leadingIcon="X"
                                        @click.stop="confirmDelete = null"
                                        variant="ghost"
                                        />
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tbody>
            </table>

            <!-- load more ref -->
            <div ref="loadMoreTarget" v-if="nextPageUrl" class="flex justify-center py-4">
                <Button 
                    variant="ghost"
                    :label="$t('Load More')" 
                    @click="loadMoreRecords" 
                    :processing="loadingMore"
                />
            </div>

        </div>

    </SidebarLayout>

</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  z-index: -1;
}

.slide-left-leave-to {
  opacity: 0;
  z-index: 10;
}

</style>