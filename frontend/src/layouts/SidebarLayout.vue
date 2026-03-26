<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
</script>

<template>

    <div class="h-screen md:flex md:overflow-y-auto bg-background">

        <Sidebar />

        <section class="min-h-screen flex-1 flex flex-col overflow-y-auto">
            
            <Topbar>
                <slot name="header" />
            </Topbar>

            <main class="flex-1 p-4 bg-secondary-background">
                <slot />
            </main>

        </section>

        <div id="modal-sidebar"></div>

    </div>
    
</template>