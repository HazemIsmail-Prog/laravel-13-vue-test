<script setup lang="ts">
import FormSingleError from '@/components/FormSingleError.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Label from '@/components/Label.vue'
import Modal from '@/components/Modal.vue'
import { ref, watch, inject } from 'vue'
import type { UserForm } from '@/types'
import Switch from '@/components/Switch.vue'
const sharedCrud = inject('sharedCrud')
const { 
    closeModal, 
    isSubmitting,
    formErrors,
    selectedRecord, 
    createRecord, 
    updateRecord, 
    modalIsOpen 
} = sharedCrud as any

watch(selectedRecord, (newVal) => {
    if (newVal) {
        form.value.id = newVal.id
        form.value.name_en = newVal.name_en
        form.value.name_ar = newVal.name_ar
        form.value.email = newVal.email
        form.value.is_active = newVal.is_active
    }else {
        resetForm()
    }
})
const form = ref<UserForm>({
    name_en: '',
    name_ar: '',
    email: '',
    password: '',
    is_active: true,
})
const resetForm = () => {
    form.value = {
        id: null,
        name_en: '',
        name_ar: '',
        email: '',
        password: '',
        is_active: true,
    }
}

</script>


<template>

    <Modal 
        :isOpen="modalIsOpen" 
        @close="closeModal()" 
        :dismissible="true"
        :width="400"
        :durationSeconds="0.15"
    >
        <div class="p-4 h-full flex flex-col gap-4">
            <!-- close modal button -->
            <button @click="closeModal()" class="text-gray-500 hover:text-gray-700 absolute top-4 end-4">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 class="text-lg font-bold text-text">{{ form.id ? $t('Edit User') : $t('Add New User') }}</h2>

            <hr class="border-border">

            <form 
                class="flex-1 flex flex-col gap-4" 
                @submit.prevent="form.id ? updateRecord(form) : createRecord(form)"
                :disabled="isSubmitting"
            >

                <div class="flex-1 flex flex-col gap-4 overflow-y-auto px-1" >

                    <div>
                        <Label for="name" :text="$t('Name')"/>
                        <Input :trailing-text="$t('en')" dir="ltr" class="text-left" type="text" id="name_en" v-model="form.name_en"/>
                        <Input :trailing-text="$t('ar')" dir="rtl" class="text-right" type="text" id="name_ar" v-model="form.name_ar"/>
                        <FormSingleError :for="formErrors.name_en" />
                        <FormSingleError :for="formErrors.name_ar" />
                    </div>
                    <div>
                        <Label for="email" :text="$t('Email')"/>
                        <Input type="email" id="email" v-model="form.email"/>
                        <FormSingleError :for="formErrors.email" />
                    </div>
                    <div>
                        <Label for="password" :text="$t('Password')"/>
                        <Input type="password" id="password" v-model="form.password"/>
                        <FormSingleError :for="formErrors.password" />
                    </div>
                    <div>
                        <Switch :label="$t('Active')" v-model="form.is_active"/>
                        <FormSingleError :for="formErrors.is_active" />
                    </div>
                </div>

                <hr class="border-border">

                <div class="flex justify-end gap-2">

                    <Button 
                        class="w-full"
                        variant="ghost"
                        :label="$t('Cancel')"
                        @click="closeModal()"
                    />

                    <Button 
                        class="w-full"
                        variant="accent"
                        type="submit"
                        :label="isSubmitting ? $t('Saving...') : $t('Save')"
                        :processing="isSubmitting"
                    />
    
                </div>

            </form>

        </div>

    </Modal>


</template>