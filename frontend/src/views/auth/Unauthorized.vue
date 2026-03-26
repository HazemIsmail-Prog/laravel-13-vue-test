<script setup lang="ts">
</script>

<template>
    <div class="flex min-h-screen bg-secondary-background items-center justify-center">
        <div class="bg-background p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 text-center">
            <h1 class="text-3xl font-bold text-danger mb-4">{{ $t('Unauthorized') }}</h1>
            <p class="text-base text-foreground/80 mb-4">{{ $t('You do not have permission to access this page.') }}</p>
            <button
                class="mt-4 px-6 py-2 bg-accent text-white rounded hover:bg-accent/80 transition"
                @click="$router.back()"
            >
                {{ $t('Back') }}
            </button>
        </div>
    </div>
</template>