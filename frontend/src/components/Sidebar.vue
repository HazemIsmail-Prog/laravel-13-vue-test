<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
const sidebar = useSidebarStore()
import NavItem from '@/components/NavItem.vue'
import { Home, Users, Info, LogOut } from '@lucide/vue'
import Settings from '@/components/Settings.vue'
import Button from '@/components/Button.vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
import router from '@/router'
import { useTranslateBackend } from '@/composables/translateBackend'
import TransisionComponent from '@/components/TransitionComponent.vue'

const { translated } = useTranslateBackend()
</script>

<template>

        <div 
            @click="sidebar.isOpen = false" 
            class="bg-black/50 md:hidden absolute inset-0 transition-all"
            :class="{ 
                'opacity-0 -z-10': !sidebar.isOpen,
                'opacity-100 z-40': sidebar.isOpen
            }"
            :style="{ transitionDuration: sidebar.durationSeconds / 2 + 's' }"
        ></div>


        <TransisionComponent 
            :show="sidebar.isOpen" 
            :height="0" 
            :width="sidebar.sidebarWidth"
            :durationSeconds=sidebar.durationSeconds
            transissionMode="slide-h"
            class="fixed top-0 start-0 z-50 md:relative" 
        >


            <aside 
                class="h-dvh p-3 bg-background shadow flex flex-col border-e md:border-none border-border" 
                :style="{ width: sidebar.sidebarWidth + 'px'}"
            >
                <h1 class="text-xl font-bold text-text px-2 whitespace-nowrap">My App</h1>
                <hr class="border-border my-3">
                <nav class="flex flex-col gap-2 overflow-y-auto h-full w-full">
                    <NavItem
                        v-if="auth.user?.can.includes('view_dashboard')"
                        :icon="Home"
                        :label="$t('Dashboard')"
                        @click="router.push({name: 'dashboard'})"
                        :isActive="$route.name === 'dashboard'"
                    />
                    <NavItem
                        v-if="auth.user?.can.includes('view_users')"
                        @click="router.push({name: 'users'})"
                        :icon="Users"
                        :label="$t('Users')"
                        :isActive="$route.name === 'users'"
                    />
                    <NavItem
                        :icon="Info"
                        @click="router.push({name: 'about'})"
                        :label="$t('About')"
                        :isActive="$route.name === 'about'"
                    />
                    <div class="flex-1"></div>
                    
                    <div>
                        <p class="text-text text-sm whitespace-nowrap">{{ translated(auth.user?.name) }}</p>
                        <p class="text-accent text-xs whitespace-nowrap">{{ auth.user?.email }}</p>
                    </div>
                    
                    <Settings />
                    

                    <Button
                        :trailingIcon="LogOut"
                        v-if="auth.user"
                        @click="auth.logout()"
                        :processing="auth.loading"
                        :label="$t('Logout')"
                    />
                </nav>
            </aside>

        </TransisionComponent>


</template>