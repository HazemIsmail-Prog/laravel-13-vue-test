<script setup lang="ts">
import { useTabTitle } from '@/composables/tabTitle'
import { useAuthStore } from '../../stores/auth'
import Button from '@/components/Button.vue'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import { ref } from 'vue'
import type { LoginForm } from '@/types'

useTabTitle('Login')
const auth = useAuthStore()
const form = ref<LoginForm>({
    email: 'test@example.com',
    password: 'password',
})

</script>

<template>
    <div class="flex min-h-screen bg-secondary-background items-center justify-center">
        <form
            @submit.prevent="auth.login(form)"
            class="bg-background p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
            <h2 class="text-2xl font-bold mb-6 text-center text-accent">{{ $t('Login') }}</h2>
            <div v-if="auth.authError" class="bg-danger/10 border border-danger text-danger px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{{ auth.authError?.message }}</span>
            </div>
            <div>
                <Label :text="$t('Email')" for="email" />
                <Input
                    id="email"
                    type="email"
                    class="text-center"
                    v-model="form.email"
                    autocomplete="email"
                    required
                />
            </div>
            <div>
                <Label :text="$t('Password')" for="password" />
                <Input
                    type="password"
                    class="text-center"
                    id="password"
                    v-model="form.password"
                    autocomplete="current-password"
                    required
                />
            </div>
            <div class="flex justify-center">
                <Button
                    type="submit"
                    class="w-full min-h-10"
                    :processing="auth.loading"
                    :label="$t('Login')"
                />
            </div>
        </form>
    </div>
</template>